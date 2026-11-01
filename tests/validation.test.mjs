import { before, test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import ts from "typescript";

let schemas, seed;
const asModule = (source) =>
  `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`;
const compile = (source) =>
  ts.transpileModule(source, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ESNext,
    },
  }).outputText;
before(async () => {
  const model = asModule(
    compile(
      await readFile(new URL("../src/model.ts", import.meta.url), "utf8"),
    ),
  );
  const source = compile(
    await readFile(new URL("../src/validation.ts", import.meta.url), "utf8"),
  )
    .replaceAll('"./model"', JSON.stringify(model))
    .replaceAll('"zod"', JSON.stringify(import.meta.resolve("zod")));
  schemas = await import(asModule(source));
  ({ seed } = await import(model));
});
const point = { lat: "22.988", lng: "-82.4655" };
const location = () => ({
  ...point,
  name: "Nueva localización",
  category: seed.categories[0].id,
  description: "Descripción válida",
});
const event = () => ({
  ...location(),
  organizer: "Comunidad",
  place: "Campus UCI",
  start: "2026-11-01T09:00",
  end: "2026-11-01T10:00",
  faculty: "Todas las facultades",
  career: "Todas las carreras",
});

test("eventos: campos obligatorios, límites y fechas válidas en orden", () => {
  const schema = schemas.eventSchema(seed.categories);
  assert.equal(schema.safeParse(event()).success, true);
  for (const field of ["name", "description", "organizer", "start", "end"]) {
    assert.equal(
      schema.safeParse({ ...event(), [field]: "  " }).success,
      false,
      field,
    );
  }
  for (const end of ["2026-11-01T09:00", "2026-11-01T08:00", "not-a-date"]) {
    assert.equal(schema.safeParse({ ...event(), end }).success, false);
  }
  assert.equal(
    schema.safeParse({ ...event(), name: "a".repeat(101) }).success,
    false,
  );
});

test("ubicaciones: rechaza coordenadas vacías, no finitas y fuera del campus en los tres formularios", () => {
  const inputs = [
    [schemas.eventSchema(seed.categories), event()],
    [
      schemas.requestSchema(seed.categories),
      { ...location(), reason: "Ayuda a encontrar el lugar" },
    ],
    [
      schemas.locationSchema(seed.categories),
      { ...location(), official: true, address: "" },
    ],
  ];
  for (const [schema, input] of inputs) {
    assert.equal(schema.safeParse(input).success, true);
    for (const coords of [
      { lat: "", lng: "" },
      { lat: " ", lng: " " },
      { lat: "Infinity", lng: "-82.4655" },
      { lat: "NaN", lng: "-82.4655" },
      { lat: "0", lng: "0" },
    ]) {
      const result = schema.safeParse({ ...input, ...coords });
      assert.equal(result.success, false);
      assert.ok(result.error.issues.some((issue) => issue.path[0] === "lat"));
    }
    assert.equal(
      schema.safeParse({ ...input, category: "missing-category" }).success,
      false,
    );
  }
});

test("categorías: normaliza espacios, mayúsculas y acentos; permite editar la categoría actual", () => {
  const existing = seed.categories[0];
  const input = {
    name: `  ${existing.name.toUpperCase()}  `,
    description: "Descripción",
  };
  assert.equal(
    schemas.categorySchema(seed.categories).safeParse(input).success,
    false,
  );
  assert.equal(
    schemas.categorySchema(seed.categories, existing.id).safeParse(input)
      .success,
    true,
  );
  const categories = [{ ...existing, name: "Educación" }];
  assert.equal(
    schemas
      .categorySchema(categories)
      .safeParse({ ...input, name: "educacion" }).success,
    false,
  );
  assert.equal(
    schemas.categorySchema([]).safeParse({ name: "Nueva", description: "   " })
      .success,
    false,
  );
});

test("comentarios y edición: recorta el texto y rechaza vacíos o más de 1000 caracteres", () => {
  assert.deepEqual(schemas.commentSchema.parse({ text: "  Hola  " }), {
    text: "Hola",
  });
  for (const text of ["", "   ", "a".repeat(1001)]) {
    assert.equal(schemas.commentSchema.safeParse({ text }).success, false);
  }
});

test("reportes y solicitudes requieren un motivo no vacío y respetan su longitud máxima", () => {
  for (const reason of ["", "   ", "a".repeat(1001)]) {
    assert.equal(schemas.reportSchema.safeParse({ reason }).success, false);
    assert.equal(
      schemas
        .requestSchema(seed.categories)
        .safeParse({ ...location(), reason }).success,
      false,
    );
  }
});

test("acciones de usuarios: motivo obligatorio solo al bloquear y máximo de 500 caracteres", () => {
  assert.equal(
    schemas.userActionSchema(true).safeParse({ reason: "  " }).success,
    false,
  );
  assert.equal(
    schemas.userActionSchema(true).safeParse({ reason: "Incumplimiento" })
      .success,
    true,
  );
  assert.equal(
    schemas.userActionSchema(false).safeParse({ reason: "" }).success,
    true,
  );
  assert.equal(
    schemas.userActionSchema(true).safeParse({ reason: "a".repeat(501) })
      .success,
    false,
  );
});

test("solicitudes: aprobar no exige motivo; rechazar sí; conserva el indicador oficial", () => {
  assert.deepEqual(
    schemas.decisionSchema(false).parse({ reason: "", official: true }),
    { reason: "", official: true },
  );
  assert.equal(
    schemas.decisionSchema(true).safeParse({ reason: " ", official: false })
      .success,
    false,
  );
  assert.equal(
    schemas
      .decisionSchema(true)
      .safeParse({ reason: "Duplicada", official: false }).success,
    true,
  );
});

test("acceso: exige un correo válido y una contraseña", () => {
  assert.deepEqual(
    schemas.loginSchema.parse({
      email: " alain.demo@uci.cu ",
      password: "demo-uci",
    }),
    { email: "alain.demo@uci.cu", password: "demo-uci" },
  );
  assert.equal(
    schemas.loginSchema.safeParse({ email: "invalid", password: "demo-uci" })
      .success,
    false,
  );
  assert.equal(
    schemas.loginSchema.safeParse({ email: "alain.demo@uci.cu", password: "" })
      .success,
    false,
  );
});

test("rutas: admite la posición demo y lugares existentes; rechaza destinos u orígenes inexistentes", () => {
  const schema = schemas.routeSchema(["biblioteca"], ["lugares/biblioteca"]);
  assert.equal(
    schema.safeParse({
      origin: "my-position",
      destination: "lugares/biblioteca",
    }).success,
    true,
  );
  assert.equal(
    schema.safeParse({
      origin: "biblioteca",
      destination: "lugares/biblioteca",
    }).success,
    true,
  );
  assert.equal(
    schema.safeParse({ origin: "missing", destination: "lugares/biblioteca" })
      .success,
    false,
  );
  assert.equal(
    schema.safeParse({ origin: "my-position", destination: "" }).success,
    false,
  );
});
