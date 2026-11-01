/** Reusable Tailwind recipes. Semantic tokens also serve as DOM hooks for descendant/state variants. */
const recipes: Record<string, string> = {
  muted: "[color:var(--muted)]",
  "small-text": "text-[13px]",
  "red-text": "[color:#df2636]!",
  "full-width": "w-full",
  button:
    "inline-flex items-center justify-center gap-[9px] min-h-[42px] [padding:10px_18px] [background:var(--black)] [border:1px_solid_var(--black)] rounded-[8px] text-white text-[14px] font-medium text-center leading-[1.35] [transition:background_0.15s,_transform_0.15s] whitespace-normal [&:hover]:[background:#333] [&:active]:[transform:translateY(1px)] [&.secondary]:bg-white [&.secondary]:[border-color:#e2e2e2] [&.secondary]:[color:#222] [&.secondary]:[box-shadow:0_1px_2px_#00000004] [&.secondary:hover]:[background:#f6f6f6] [&.danger]:[background:#f21b2e] [&.danger]:[border-color:#f21b2e] [&.danger:hover]:[background:#d7192a]",
  "small-button": "text-[12px] [padding:8px_11px] min-h-[35px]",
  "icon-button":
    "inline-flex items-center justify-center border-0 bg-transparent rounded-[7px] w-[35px] h-[35px] shrink-0 p-0 [&:hover]:[background:#f2f2f2]",
  "text-button":
    "inline-flex items-center justify-center gap-[6px] [padding:5px_0] bg-none border-0 text-[13px] [color:#555] [&:hover]:underline",
  solid: "[background:#171717] text-white [&:hover]:[background:#444]",
  "danger-solid":
    "[background:#ff3547] text-white [&:hover]:[background:#e42638]",
  "inline-actions": "flex items-center gap-[14px] flex-wrap",
  "back-link":
    "inline-flex items-center gap-[5px] [color:#666] text-[13px] mb-[24px] [&:hover]:[color:#111] [@media(max-width:_700px)]:mb-[23px] [@media(max-width:_700px)]:text-[12px]",
  "skip-link":
    "fixed left-[16px] top-[-80px] z-[2000] [background:#111] text-white [padding:12px_20px] rounded-[8px] [&:focus]:top-[12px]",
  topbar:
    "h-[var(--header-h)] flex items-center justify-between [padding:0_25px] [border-bottom:1px_solid_#eaeaea] bg-white relative z-[500] gap-[20px] [@media(max-width:_700px)]:[padding:0_15px] [@media(max-width:_700px)]:gap-[12px]",
  "header-brand":
    "flex gap-[12px] items-center whitespace-nowrap [@media(max-width:_700px)]:gap-[10px]",
  brand:
    "inline-flex items-center gap-[10px] text-[23px] font-[650] tracking-[-0.7px] [@media(max-width:_700px)]:text-[20px]",
  "brand-green": '[&::before]:[content:"_"] [&::before]:[white-space:pre]',
  "brand-icon":
    "hidden items-center justify-center w-[43px] h-[43px] text-white [background:#171717] rounded-[12px]",
  "menu-button":
    "w-[38px] h-[38px] inline-flex items-center justify-center [border:1px_solid_#e7e7e7] rounded-[9px] bg-white [box-shadow:0_1px_3px_#00000004] [&:hover]:[background:#f7f7f7] [@media(max-width:_700px)]:w-[34px] [@media(max-width:_700px)]:h-[34px] [@media(max-width:_700px)]:rounded-[8px] [@media(max-width:_700px)]:[&_>_svg]:w-[19px]",
  "desktop-nav":
    "flex gap-[30px] items-center h-full text-[13px] [color:#777] [&_a]:flex [&_a]:items-center [&_a]:h-full [&_a]:[border-bottom:2px_solid_transparent] [&_a.active]:[color:#111] [&_a.active]:[border-bottom-color:#111] [@media(max-width:_1000px)]:gap-[19px] [@media(max-width:_700px)]:hidden",
  "header-account":
    "flex items-center gap-[16px] [@media(max-width:_700px)]:gap-[10px] [@media(max-width:_700px)]:[&_>_.demo-tag]:text-[8px] [@media(max-width:_700px)]:[&_>_.demo-tag]:[padding:3px_5px]",
  "demo-tag":
    "text-[10px] font-medium [padding:4px_7px] [border:1px_solid_#e7e7e7] [color:#777] rounded-[5px] tracking-[0.3px] leading-[1.3]",
  "account-button":
    "flex items-center gap-[9px] [@media(max-width:_700px)]:[&_.avatar]:w-[30px] [@media(max-width:_700px)]:[&_.avatar]:h-[30px] [@media(max-width:_700px)]:[&_.avatar]:text-[10px]",
  avatar:
    "w-[34px] h-[34px] [background:#f1f1f1] [border:1px_solid_#e6e6e6] rounded-full inline-flex items-center justify-center text-[11px] font-semibold shrink-0 [color:#444]",
  "account-name":
    "text-[12px] leading-[1.3] font-medium [&_small]:block [&_small]:text-[10px] [&_small]:[color:#8b8b8b] [&_small]:font-normal [&_small]:mt-[3px] [@media(max-width:_1000px)]:hidden",
  "admin-label": "text-[17px] ml-[0] [@media(max-width:_700px)]:text-[16px]",
  page: "max-w-[1180px] [margin:0_auto] [padding:32px_35px_70px] [&.narrow]:max-w-[860px] [@media(min-width:_1500px)]:pt-[45px] [@media(max-width:_700px)]:[padding:24px_20px_75px]",
  "page-head":
    "flex items-start justify-between gap-[25px] mb-[30px] [&_>_.button]:shrink-0 [&_>_.button]:mt-[2px] [&_p]:mb-[0] [&_p]:text-[14px] [@media(max-width:_700px)]:mb-[25px] [@media(max-width:_700px)]:gap-[18px] [@media(max-width:_700px)]:flex-wrap [@media(max-width:_700px)]:[&_h1]:text-[29px] [@media(max-width:_700px)]:[&_h1]:tracking-[-0.9px] [@media(max-width:_700px)]:[&_p]:text-[12px] [@media(max-width:_700px)]:[&_p]:leading-[1.65] [@media(max-width:_700px)]:[&_>_.button]:min-h-[38px] [@media(max-width:_700px)]:[&_>_.button]:text-[12px]",
  eyebrow: "text-[10px] tracking-[1.5px] [text-transform:uppercase]",
  badge:
    "inline-flex items-center gap-[5px] whitespace-nowrap [padding:4px_8px] rounded-[5px] font-medium text-[10px] leading-[1.4] [border:1px_solid_transparent] [&.gray]:[background:#f4f4f4] [&.gray]:[border-color:#eaeaea] [&.gray]:[color:#5c5c5c] [&.green]:[background:#edf5ee] [&.green]:[color:#3c7750] [&.gold]:[background:#fcf6e9] [&.gold]:[color:#9b762b] [&.red]:[background:#fceff0] [&.red]:[color:#c43c4a]",
  empty:
    "[padding:75px_20px] text-center [color:#777] [&_>_span]:inline-flex [&_>_span]:[padding:17px] [&_>_span]:[background:#f7f7f7] [&_>_span]:rounded-full [&_>_span]:mb-[20px] [&_h3]:text-[18px] [&_h3]:[color:#333] [&_p]:text-[14px] [&_p]:max-w-[380px] [&_p]:[margin:0_auto_20px]",
  "section-title":
    "flex gap-[9px] items-center [&_h3]:m-0 [&_h2]:m-0 [&_>_a]:ml-auto [&_>_a]:flex",
  "search-box":
    "flex items-center gap-[9px] min-h-[43px] [border:1px_solid_#e7e7e7] rounded-[8px] [padding:0_12px] bg-white [color:#888] [&:focus-within]:[outline:3px_solid_#e9f1f7] [&:focus-within]:[border-color:#96b3cd] [&_input]:[padding:10px_0] [&_input]:bg-transparent [&_input]:border-0 [&_input]:text-[13px] [&_input]:[outline:0]! [&_button]:border-0 [&_button]:bg-none [&_button]:[color:#888] [&_button]:flex [&_button]:items-center [&_button]:[padding:3px]",
  "search-shortcut": "text-[18px] [color:#aaa]",
  "field-hint":
    "text-[11px] leading-[1.65] [color:#8a8a8a] [margin:10px_0_16px] [&_svg]:[display:inline] [&_svg]:align-middle [&_svg]:mr-[4px]",
  "field-error":
    "text-[12px] [color:#e13c4e] [margin:5px_0_10px] leading-[1.45]",
  "form-alert":
    "[background:#fff1f2] [color:#b52e3c] [padding:12px] [border:1px_solid_#f3ccd0] rounded-[7px] text-[13px] [margin:0_0_16px]",
  "drawer-backdrop":
    "fixed [inset:var(--header-h)_0_0] [background:#0006] z-[800] [animation:fade-in_0.15s]",
  drawer:
    "h-full w-[365px] bg-white [box-shadow:5px_0_20px_#0000000a] [padding:21px_22px_15px] flex flex-col [animation:slide-in_0.2s] [@media(max-width:_700px)]:w-[min(85vw,_355px)] [@media(max-width:_700px)]:[padding:17px_17px_13px] [@media(max-width:_700px)]:[&_.search-box]:[padding:0_9px] [@media(max-width:_700px)]:[&_.search-box]:min-h-[38px] [@media(max-width:_700px)]:[&_.search-box_input]:text-[12px]",
  "drawer-heading":
    "flex gap-[10px] items-center mb-[16px] [&_h2]:text-[20px] [&_h2]:m-0 [&_h2]:font-medium [&_.icon-button]:w-[25px] [&_.demo-tag]:ml-auto [@media(max-width:_700px)]:mb-[15px] [@media(max-width:_700px)]:[&_h2]:text-[18px]",
  "drawer-results":
    "overflow-y-auto min-h-[80px] mt-[15px] pr-[2px] [&_>_.empty]:[padding:20px] [@media(max-width:_700px)]:mt-[13px]",
  "drawer-section":
    "[border:1px_solid_#e7e7e7] [padding:13px] rounded-[8px] mb-[13px] [&_.section-title]:gap-[7px] [&_.section-title]:mb-[9px] [&_h3]:text-[14px] [&_h3]:font-medium [@media(max-width:_700px)]:[padding:11px] [@media(max-width:_700px)]:[&_h3]:text-[12px] [@media(max-width:_700px)]:[&_.section-title_>_svg]:w-[16px]",
  "drawer-result":
    "block [padding:7px_4px] rounded-[5px] [&:hover]:[background:#f6f6f6] [&_strong]:block [&_strong]:text-[13px] [&_strong]:font-[450] [&_strong]:leading-[1.4] [&_small]:block [&_small]:[color:#8b8b8b] [&_small]:text-[11px] [&_small]:mt-[3px] [@media(max-width:_700px)]:[&_strong]:text-[13px] [@media(max-width:_700px)]:[&_small]:text-[11px]",
  "drawer-links":
    "grid gap-[1px] [border-top:1px_solid_#ededed] pt-[10px] mt-[10px] shrink-0 [&_a]:flex [&_a]:gap-[10px] [&_a]:items-center [&_a]:[padding:9px_8px] [&_a]:rounded-[6px] [&_a]:text-[12px] [&_a:hover]:[background:#f5f5f5] [@media(max-width:_700px)]:[&_a]:text-[12px] [@media(max-width:_700px)]:[&_a]:[padding:8px_6px]",
  "drawer-foot":
    "text-[9px] [color:#999] [margin:14px_0_0] text-center [@media(max-width:_700px)]:text-[8px]",
  "map-screen":
    "h-[calc(100dvh_-_var(--header-h))] min-h-[400px] relative overflow-hidden [&_.fab]:absolute [&_.fab]:bottom-[31px] [@media(max-width:_700px)]:[&_.fab]:right-[18px] [@media(max-width:_700px)]:[&_.fab]:bottom-[28px]",
  "detail-screen":
    "h-[calc(100dvh_-_var(--header-h))] min-h-[400px] relative overflow-hidden [&_>_.modal]:w-[465px] [@media(max-width:_700px)]:[&_.button]:text-[12px]",
  "campus-map":
    "h-full w-full relative [background:#e9eddf] [isolation:auto] [&.small]:h-[195px] [&.small]:rounded-[7px] [&.small]:overflow-hidden [&.small]:[border:1px_solid_#e6e6e6] [&.small]:mt-[10px] [@media(max-width:_700px)]:[&.small]:h-[178px]",
  "map-canvas": "w-full h-full z-[0] font-[inherit] [background:#e9eddf]",
  "map-loading":
    "flex items-center justify-center flex-col gap-[15px] w-full h-full min-h-[190px] [background:#ebefe3] [color:#7a8271] text-[13px]",
  loading: "[padding:90px] flex justify-center gap-[15px] [color:#888]",
  "campus-pill": "hidden",
  "map-north": "hidden",
  "map-search-tools":
    "absolute z-[400] top-[17px] left-[20px] w-[420px] max-w-[calc(100%_-_40px)] [@media(max-width:_700px)]:left-[16px] [@media(max-width:_700px)]:right-[16px] [@media(max-width:_700px)]:w-[auto] [@media(max-width:_700px)]:max-w-[none] [@media(max-width:_700px)]:top-[16px]",
  "map-search":
    "flex gap-[10px] items-center w-full min-h-[44px] [border:1px_solid_#d9ded6] bg-white rounded-[8px] [padding:10px_15px] [color:#777] text-left text-[13px] [box-shadow:0_3px_13px_#22331c10] [&_span]:overflow-hidden [&_span]:text-ellipsis [&_span]:whitespace-nowrap [@media(max-width:_700px)]:min-h-[44px] [@media(max-width:_700px)]:text-[12px] [@media(max-width:_700px)]:[padding:11px_13px] [@media(max-width:_700px)]:gap-[9px] [@media(max-width:_700px)]:[&_>_svg]:w-[16px]",
  "map-kind-filters":
    "flex gap-[7px] mt-[9px] whitespace-nowrap [&_button]:[border:1px_solid_#e0e0d9] [&_button]:bg-white [&_button]:[box-shadow:0_2px_5px_#00000008] [&_button]:rounded-[7px] [&_button]:[padding:8px_12px] [&_button]:flex [&_button]:gap-[5px] [&_button]:items-center [&_button]:text-[11px] [&_button.active]:[background:#171717] [&_button.active]:text-white [&_button.active]:[border-color:#171717] [@media(max-width:_700px)]:gap-[8px] [@media(max-width:_700px)]:mt-[10px] [@media(max-width:_700px)]:[&_button]:text-[11px] [@media(max-width:_700px)]:[&_button]:[padding:8px_11px] [@media(max-width:_700px)]:[&_button]:min-h-[36px]",
  "map-controls":
    'flex flex-col gap-[10px] absolute right-[20px] bottom-[100px] z-[450] [&:has([aria-expanded="true"])]:z-[480] [@media(max-width:_700px)]:right-[16px] [@media(max-width:_700px)]:bottom-[96px] [@media(max-width:_700px)]:gap-[8px]',
  "map-button":
    "bg-white [border:1px_solid_#ddd] w-[39px] h-[39px] flex items-center justify-center [box-shadow:0_1px_6px_#0000000a] [color:#333] rounded-[7px] [&:hover]:[background:#f8f8f8] [&.active]:[background:#eee] [@media(max-width:_700px)]:w-[44px] [@media(max-width:_700px)]:h-[44px]",
  "zoom-buttons":
    "grid [box-shadow:0_2px_8px_#00000010] rounded-[7px] overflow-hidden [&_.map-button]:rounded-none [&_.map-button]:[border-bottom:0] [&_.map-button]:[box-shadow:none] [&_.map-button:last-child]:[border-bottom:1px_solid_#ddd] [@media(max-width:_700px)]:[&_.map-button_svg]:w-[20px]",
  "layer-control": "relative",
  "layer-menu":
    "absolute top-[0] right-[calc(100%_+_12px)] bg-white [border:1px_solid_#e1e1e1] rounded-[9px] w-[215px] [padding:13px] [box-shadow:0_6px_25px_#0002] [&_>_strong]:text-[12px] [&_>_strong]:block [&_>_strong]:mb-[10px] [&_>_button]:w-full [&_>_button]:text-left [&_>_button]:border-0 [&_>_button]:rounded-[5px] [&_>_button]:bg-white [&_>_button]:[padding:10px] [&_>_button]:text-[12px] [&_>_button.active]:[background:#f0f0f0] [&_>_button_>_span]:block [&_>_button_>_span]:[color:#999] [&_>_button_>_span]:text-[10px] [&_>_button_>_span]:mt-[3px]",
  "map-attribution":
    "absolute bottom-[0] right-[0] [padding:3px_6px] [background:#ffffffd9] [color:#6f726a] text-[9px] z-[400] [@media(max-width:_700px)]:text-[8px]",
  "map-marker":
    "w-[34px] h-[34px] [background:var(--marker-color)] [border:3px_solid_white] [box-shadow:0_3px_8px_#0003] rounded-[50%_50%_50%_5%] [transform:rotate(-45deg)] flex items-center justify-center [transition:scale_0.15s] [&_span]:block [&_span]:[transform:rotate(45deg)] [&_span]:text-[15px] [&_span]:text-white [&.selected]:[scale:1.2] [&.selected]:[box-shadow:0_0_0_5px_#ffffff80,_0_3px_8px_#0003] [&:hover]:[scale:1.1]",
  "marker-host":
    "[&:focus-visible]:[outline:3px_solid_#191919] [&:focus-visible]:[outline-offset:5px]",
  "map-label":
    "[box-shadow:0_2px_8px_#0001] border-0 [padding:6px_9px] max-w-[230px] whitespace-normal font-[inherit] text-[11px] [color:#333] rounded-[5px]",
  "position-halo":
    "w-[42px] h-[42px] rounded-full [background:#24bde930] flex items-center justify-center [&_>_span]:w-[20px] [&_>_span]:h-[20px] [&_>_span]:[background:#12b8e6] [&_>_span]:[border:3px_solid_white] [&_>_span]:rounded-full [&_>_span]:[box-shadow:0_0_0_1px_#12b8e630]",
  "map-info-card":
    'absolute z-[460] top-[155px] left-[calc(50%_-_180px)] w-[360px] [padding:20px] bg-white rounded-[10px] [border:1px_solid_#e3e3e3] [box-shadow:0_8px_40px_#0002] [&:after]:[content:""] [&:after]:absolute [&:after]:left-[calc(50%_-_10px)] [&:after]:bottom-[-10px] [&:after]:bg-white [&:after]:w-[20px] [&:after]:h-[20px] [&:after]:[transform:rotate(45deg)] [&:after]:z-[-1] [&_h3]:text-[16px] [&_h3]:pr-[15px] [&_h3]:[margin:0_0_3px] [&_>_small]:text-[10px] [&_>_small]:[color:#8a8a8a] [&_>_p]:text-[12px] [&_>_p]:[margin:12px_0_15px] [@media(max-width:_700px)]:left-[17px] [@media(max-width:_700px)]:top-[150px] [@media(max-width:_700px)]:w-[calc(100%_-_34px)] [@media(max-width:_700px)]:max-w-[370px] [@media(max-width:_700px)]:[padding:18px] [@media(max-width:_700px)]:[&_h3]:text-[14px] [@media(max-width:_700px)]:[&_>_p]:text-[12px] [@media(max-width:_700px)]:[&_>_p]:mb-[14px] [@media(max-width:_700px)]:[&_>_small]:text-[9px]',
  "info-close": "absolute right-[7px] top-[7px] w-[24px] h-[24px] [color:#888]",
  "info-actions":
    "flex justify-end gap-[8px] [&_.button]:text-[12px] [&_.button]:[padding:8px_12px] [&_.button]:min-h-[35px] [@media(max-width:_700px)]:[&_.button]:text-[11px] [@media(max-width:_700px)]:[&_.button]:min-h-[32px] [@media(max-width:_700px)]:[&_.button]:[padding:8px_11px]",
  "map-bottom-legend":
    "absolute bottom-[23px] left-[20px] z-[400] flex gap-[15px] items-center [background:#fffffff0] [border:1px_solid_#e3e5df] rounded-[7px] [padding:9px_12px] text-[10px] [color:#696969] [box-shadow:0_1px_5px_#00000008] [&_>_span]:flex [&_>_span]:gap-[5px] [&_>_span]:items-center [@media(max-width:_700px)]:left-[15px] [@media(max-width:_700px)]:bottom-[24px] [@media(max-width:_700px)]:gap-[10px] [@media(max-width:_700px)]:text-[8px] [@media(max-width:_700px)]:[padding:8px_9px] [@media(max-width:_700px)]:[&_.legend-position]:hidden",
  "legend-dot":
    "inline-block w-[7px] h-[7px] rounded-full [&.blue]:[background:#238dcb] [&.red]:[background:#e74b50] [&.cyan]:[background:#12b8e6]",
  fab: "fixed bottom-[30px] right-[28px] flex justify-center items-center w-[51px] h-[51px] rounded-full [background:#171717] text-white [box-shadow:0_4px_15px_#0003] z-[470] [@media(max-width:_700px)]:w-[47px] [@media(max-width:_700px)]:h-[47px] [@media(max-width:_700px)]:right-[20px] [@media(max-width:_700px)]:bottom-[24px]",
  small:
    "[&_.map-controls]:right-[8px] [&_.map-controls]:top-[8px] [&_.map-controls]:bottom-[auto] [&_.map-controls]:gap-[5px] [&_.map-button]:w-[29px] [&_.map-button]:h-[29px] [&_.map-button]:rounded-[5px] [&_.map-button_svg]:w-[16px] [&_.zoom-buttons]:[position:static] [&_.zoom-buttons]:[box-shadow:none] [&_.layer-control]:hidden [&_.map-attribution]:text-[7px] [&_.map-attribution]:max-w-[80%]",
  "map-pick-hint":
    "absolute bottom-[17px] left-[8px] z-[400] [background:#fffffff0] [padding:5px_7px] flex items-center gap-[4px] rounded-[4px] text-[9px] [color:#666] pointer-events-none",
  picking: "[&_.map-canvas]:[cursor:crosshair]",
  "catalog-tools":
    "flex gap-[12px] items-center mb-[18px] [&_>_.search-box]:flex-1 [&_>_.search-box]:min-w-[200px] [&_select]:max-w-[220px] [&_select]:text-[12px] [&_.checkbox-label]:whitespace-nowrap [&_.checkbox-label]:m-0 [@media(max-width:_1000px)]:flex-wrap [@media(max-width:_1000px)]:[&_>_.search-box]:basis-[100%] [@media(max-width:_1000px)]:[&_>_select]:max-w-[none] [@media(max-width:_1000px)]:[&_>_select]:flex-1 [@media(max-width:_700px)]:gap-[10px] [@media(max-width:_700px)]:[&_select]:text-[11px] [@media(max-width:_700px)]:[&_select]:[padding:9px] [@media(max-width:_700px)]:[&_select]:min-h-[39px] [@media(max-width:_700px)]:[&_>_.search-box]:min-w-0",
  "checkbox-label":
    "flex gap-[8px] items-center font-normal [margin:15px_0] text-[13px] leading-[1.5]",
  "category-filters":
    "flex gap-[8px] overflow-x-auto [padding:0_0_12px] [scrollbar-width:thin] [&_button]:flex [&_button]:items-center [&_button]:gap-[7px] [&_button]:bg-white [&_button]:[border:1px_solid_#e2e2e2] [&_button]:rounded-[7px] [&_button]:[padding:8px_12px] [&_button]:whitespace-nowrap [&_button]:text-[12px] [&_button.active]:[background:#171717] [&_button.active]:text-white [&_button.active]:[border-color:#171717] [@media(max-width:_700px)]:mr-[-20px] [@media(max-width:_700px)]:pr-[20px] [@media(max-width:_700px)]:[&_button]:text-[10px] [@media(max-width:_700px)]:[&_button]:[padding:8px_10px] [@media(max-width:_700px)]:[&_button]:gap-[5px] [@media(max-width:_700px)]:[&_button_svg]:w-[13px]",
  "results-heading":
    "flex items-center justify-between text-[12px] [color:#888] [margin:14px_0_18px] min-h-[24px] [@media(max-width:_700px)]:text-[11px]",
  "place-grid":
    "grid [grid-template-columns:repeat(3,_minmax(0,_1fr))] gap-[18px] [@media(max-width:_1000px)]:[grid-template-columns:repeat(2,_minmax(0,_1fr))] [@media(max-width:_700px)]:[grid-template-columns:1fr] [@media(max-width:_700px)]:gap-[13px]",
  "event-grid":
    "grid [grid-template-columns:repeat(3,_minmax(0,_1fr))] gap-[18px] [@media(max-width:_1000px)]:[grid-template-columns:repeat(2,_minmax(0,_1fr))] [@media(max-width:_700px)]:[grid-template-columns:1fr] [@media(max-width:_700px)]:gap-[13px]",
  "place-card":
    "block relative [border:1px_solid_#e5e5e5] rounded-[10px] overflow-hidden [transition:box-shadow_0.15s,_border-color_0.15s] bg-white [&:hover]:[box-shadow:0_3px_14px_#00000008] [&:hover]:[border-color:#cfcfcf] [&_h3]:text-[17px] [&_h3]:[margin:8px_0_12px] [&_h3]:font-[550] [&_h3]:tracking-[-0.25px] [&_p]:flex [&_p]:gap-[5px] [&_p]:[color:#8a8a8a] [&_p]:text-[11px] [&_p]:items-center [&_p]:leading-[1.5] [&_p]:m-0 [&_h3]:pr-[14px] [@media(max-width:_700px)]:[&_h3]:text-[16px] [@media(max-width:_700px)]:[&_p]:text-[11px]",
  "event-card":
    "block relative [border:1px_solid_#e5e5e5] rounded-[10px] overflow-hidden [transition:box-shadow_0.15s,_border-color_0.15s] bg-white [&:hover]:[box-shadow:0_3px_14px_#00000008] [&:hover]:[border-color:#cfcfcf] [&:has(.featured)_.category-line]:pr-[85px] [&_h3]:text-[17px] [&_h3]:[margin:8px_0_12px] [&_h3]:font-[550] [&_h3]:tracking-[-0.25px] [&_p]:flex [&_p]:gap-[5px] [&_p]:[color:#8a8a8a] [&_p]:text-[11px] [&_p]:items-center [&_p]:leading-[1.5] [&_p]:m-0 [@media(max-width:_700px)]:[&_h3]:text-[16px] [@media(max-width:_700px)]:[&_p]:text-[11px]",
  art: "hidden",
  "event-art": "absolute right-[16px] top-[18px]",
  "date-stamp": "hidden",
  featured:
    "inline-flex items-center gap-[4px] [background:#fff9df] [color:#9a7b26] [padding:4px_6px] text-[9px] rounded-[4px]",
  "place-card-content":
    "[padding:22px] [@media(max-width:_700px)]:[padding:19px]",
  "event-card-content":
    "[padding:22px] [@media(max-width:_700px)]:[padding:19px]",
  "category-line":
    "flex items-center gap-[6px] text-[11px] leading-[1.5] [color:#858585]! [&_.official-icon]:ml-[3px] [@media(max-width:_700px)]:text-[10px]",
  "card-arrow": "absolute right-[16px] bottom-[21px] [color:#999]",
  "event-card-footer":
    "flex items-center justify-between [border-top:1px_solid_#eee] mt-[20px] pt-[13px] text-[10px] [color:#8a8a8a] [&_>_span]:flex [&_>_span]:items-center [&_>_span]:gap-[8px] [@media(max-width:_700px)]:pt-[12px] [@media(max-width:_700px)]:mt-[16px]",
  "avatar-stack": "hidden",
  metadata:
    "grid gap-[15px] [padding:17px_0] [margin:15px_0] [border-top:1px_solid_#eee] [border-bottom:1px_solid_#eee] [&_>_span]:flex [&_>_span]:items-center [&_>_span]:gap-[13px] [&_>_span]:[color:#777] [&_strong]:text-[13px] [&_strong]:[color:#333] [&_strong]:font-medium [&_strong]:block [&_small]:text-[11px] [&_small]:block [&_small]:mt-[3px] [&_small]:[color:#999] [@media(max-width:_700px)]:[&_strong]:text-[12px] [@media(max-width:_700px)]:[&_small]:text-[10px] [@media(max-width:_700px)]:[&_svg]:w-[17px]",
  "detail-category":
    "flex gap-[7px] items-center text-[13px] [color:#777] [margin:4px_0_16px] [&_.badge]:ml-auto [@media(max-width:_700px)]:text-[12px]",
  "detail-description":
    "text-[13px] leading-[1.75] [margin:16px_0] [@media(max-width:_700px)]:text-[13px] [@media(max-width:_700px)]:leading-[1.7]",
  coords:
    "text-[10px] [color:#999] [margin:10px_0_20px] [@media(max-width:_700px)]:text-[9px]",
  "detail-facts":
    "text-[12px] [color:#777] [padding:10px_0] [border-top:1px_solid_#eee] [border-bottom:1px_solid_#eee] [&_p]:flex [&_p]:items-center [&_p]:gap-[9px] [&_p]:[margin:8px_0] [@media(max-width:_700px)]:text-[11px]",
  "event-organizer":
    "flex gap-[10px] items-center [margin:20px_0_12px] [color:#777] [&_small]:block [&_small]:[color:#999] [&_small]:text-[10px] [&_small]:mb-[4px] [&_strong]:text-[12px] [&_strong]:font-medium [@media(max-width:_700px)]:[&_strong]:text-[11px]",
  "event-audience":
    "flex gap-[7px] flex-wrap mb-[18px] [&_span]:[padding:4px_7px] [&_span]:[background:#f6f6f6] [&_span]:text-[9px] [&_span]:rounded-[4px] [&_span]:[color:#888] [@media(max-width:_700px)]:[&_span]:text-[8px]",
  "reaction-row":
    "[border-top:1px_solid_#eee] [border-bottom:1px_solid_#eee] [padding:13px_0] flex items-center justify-between text-[11px] gap-[10px] [&_>_div]:flex [&_>_div]:gap-[8px] [&_button]:flex [&_button]:gap-[6px] [&_button]:items-center [&_button]:[border:1px_solid_#ddd] [&_button]:bg-white [&_button]:rounded-[6px] [&_button]:[padding:7px_9px] [&_button]:text-[12px] [&_button.selected]:[background:#171717] [&_button.selected]:text-white [&_button.selected]:[border-color:#171717] [@media(max-width:_700px)]:text-[10px] [@media(max-width:_700px)]:[&_button]:text-[11px] [@media(max-width:_700px)]:[&_button]:[padding:7px]",
  comments:
    "mt-[24px] [&_>_h3]:flex [&_>_h3]:items-center [&_>_h3]:gap-[7px] [&_>_h3]:text-[18px] [&_>_h3_>_span]:text-[11px] [&_>_h3_>_span]:[color:#888] [&_>_h3_>_span]:font-normal [&_>_h3_>_span]:ml-auto [@media(max-width:_700px)]:[&_>_h3]:text-[17px]",
  comment:
    "[border:1px_solid_#e3e3e3] rounded-[7px] [padding:12px] [margin:12px_0] [&_>_p]:text-[12px] [&_>_p]:leading-[1.65] [&_>_p]:[margin:9px_0_0] [@media(max-width:_700px)]:[padding:10px] [@media(max-width:_700px)]:[&_>_p]:text-[13px]",
  "comment-head":
    "flex gap-[8px] items-center [&_strong]:text-[11px] [&_strong]:font-medium [@media(max-width:_700px)]:[&_strong]:text-[12px]",
  "small-avatar": "w-[26px] h-[26px] text-[9px]",
  "comment-actions":
    "ml-auto flex [&_.icon-button]:h-[24px] [&_.icon-button]:w-[24px]",
  "comment-form":
    "[border:1px_solid_#e5e5e5] rounded-[7px] [padding:13px] mt-[17px] [display:flow-root] [&_>_label]:text-[13px] [&_>_label]:[margin:0_0_9px] [&_textarea]:text-[12px] [&_textarea]:min-h-[80px] [&_>_.button]:[float:right] [&_>_.button]:mt-[9px] [@media(max-width:_700px)]:[padding:11px] [@media(max-width:_700px)]:[&_label]:text-[12px] [@media(max-width:_700px)]:[&_textarea]:text-[12px]",
  "report-button":
    "border-0 bg-none flex gap-[7px] items-center [margin:18px_auto_0] [padding:5px] [color:#777] text-[12px] [&:hover]:[color:#222] [@media(max-width:_700px)]:text-[11px]",
  modal:
    "[border:1px_solid_#ddd] rounded-[11px] [padding:24px] w-[470px] max-w-[calc(100vw_-_32px)] max-h-[calc(100dvh_-_46px)] [box-shadow:0_15px_65px_#0002] [color:#191919] overflow-auto [overscroll-behavior:contain] [scrollbar-width:thin] [&::backdrop]:[background:#0007] [&::backdrop]:[animation:fade-in_0.12s] [&_>_p]:text-[13px] [&_>_form_>_p]:text-[13px] [&_form_>_label:first-child]:mt-[0] [&_form_>_.full-width]:mt-[20px] [&_input]:text-[13px] [&_textarea]:text-[13px] [&_select]:text-[13px] [@media(max-width:_700px)]:[padding:20px] [@media(max-width:_700px)]:max-w-[calc(100vw_-_32px)] [@media(max-width:_700px)]:max-h-[calc(100dvh_-_40px)] [@media(max-width:_700px)]:rounded-[10px] [@media(max-width:_700px)]:[&_>_p]:text-[12px] [@media(max-width:_700px)]:[&_input]:text-[12px] [@media(max-width:_700px)]:[&_textarea]:text-[12px] [@media(max-width:_700px)]:[&_select]:text-[12px] [@media(max-width:_700px)]:[&_label]:text-[12px]",
  "modal-head":
    "flex items-start justify-between gap-[16px] mb-[20px] [&_h2]:text-[22px] [&_h2]:leading-[1.4] [&_h2]:font-[550] [&_h2]:tracking-[-0.55px] [&_h2]:m-0 [&_.icon-button]:h-[25px] [&_.icon-button]:w-[25px] [&_.icon-button]:[color:#999] [&_.icon-button]:mt-[2px] [&_.icon-button]:shrink-0 [@media(max-width:_700px)]:mb-[18px] [@media(max-width:_700px)]:gap-[12px] [@media(max-width:_700px)]:[&_h2]:text-[20px] sticky top-[-24px] bg-white z-[2] pt-[4px] pb-[8px] [box-shadow:0_8px_8px_white] [@media(max-width:_700px)]:top-[-20px]",
  "modal-description":
    "[margin:4px_0_24px] [@media(max-width:_700px)]:leading-[1.7]",
  "modal-actions":
    "flex gap-[9px] justify-end mt-[22px] [&_>_.button]:flex-1 [@media(max-width:_700px)]:flex-col-reverse [@media(max-width:_700px)]:gap-[9px] [@media(max-width:_700px)]:[&_.button]:min-h-[39px] [@media(max-width:_700px)]:[&_.button]:text-[12px]",
  toast:
    "fixed z-[2000] bottom-[24px] left-[50%] [transform:translateX(-50%)] max-w-[calc(100vw_-_32px)] w-[max-content] flex items-center gap-[11px] bg-white [padding:15px_17px] [border:1px_solid_#e5e5e5] rounded-[9px] [box-shadow:0_4px_25px_#00000014] text-[12px] leading-[1.6] [animation:toast-in_0.2s] [&_>_button]:border-0 [&_>_button]:bg-none [&_>_button]:text-[20px] [&_>_button]:[color:#aaa] [&_>_button]:ml-[9px] [&_>_button]:p-0 [&_>_span:nth-child(2)]:max-w-[500px] [@media(max-width:_700px)]:bottom-[17px] [@media(max-width:_700px)]:[padding:13px_14px] [@media(max-width:_700px)]:gap-[8px] [@media(max-width:_700px)]:text-[11px] [@media(max-width:_700px)]:min-w-[calc(100vw_-_34px)] [@media(max-width:_700px)]:[&_>_span:nth-child(2)]:max-w-[calc(100vw_-_117px)] [@media(max-width:_700px)]:[&_>_button]:ml-auto [&[popover]]:top-[auto] [&[popover]]:right-[auto] [&[popover]]:m-0 [&[popover]]:overflow-visible",
  "toast-check":
    "inline-flex [background:#222] text-white items-center justify-center w-[18px] h-[18px] rounded-full text-[11px] shrink-0 [@media(max-width:_700px)]:w-[16px] [@media(max-width:_700px)]:h-[16px]",
  "own-events": "grid gap-[16px]",
  "own-event":
    "[padding:21px_23px] [border:1px_solid_#e4e4e4] rounded-[10px] [&_>_p:not(.category-line)]:text-[13px] [&_>_p:not(.category-line)]:[color:#777] [&_>_p:not(.category-line)]:leading-[1.65] [&_>_p:not(.category-line)]:[margin:14px_0] [@media(max-width:_700px)]:[padding:18px] [@media(max-width:_700px)]:[&_>_p:not(.category-line)]:text-[12px]",
  "own-event-heading":
    "flex justify-between gap-[15px] items-start [&_h3]:text-[17px] [&_h3]:mb-[7px] [&_h3]:font-[550] [&_>_div]:flex [&_>_div]:gap-[4px] [@media(max-width:_700px)]:[&_h3]:text-[15px] [@media(max-width:_700px)]:[&_.icon-button]:w-[28px] [@media(max-width:_700px)]:[&_.icon-button]:h-[28px] [@media(max-width:_700px)]:[&_.icon-button_svg]:w-[16px]",
  "own-event-stats":
    "flex gap-[20px] flex-wrap text-[11px] [color:#999] [&_>_span]:flex [&_>_span]:gap-[5px] [&_>_span]:items-center [@media(max-width:_700px)]:text-[10px] [@media(max-width:_700px)]:gap-[12px]",
  "form-page":
    "max-w-[665px] [@media(max-width:_700px)]:[padding:22px_20px_65px]",
  "form-card":
    "[border:1px_solid_#e6e6e6] [padding:30px] rounded-[12px] [box-shadow:0_2px_5px_#00000004] [&_.page-head]:mb-[25px] [&_h1]:text-[28px] [&_h1]:tracking-[-0.8px] [&_.page-head_p]:text-[12px] [&_label:first-child]:mt-[0] [&_input]:text-[13px] [&_select]:text-[13px] [&_textarea]:text-[13px] [@media(max-width:_700px)]:p-0 [@media(max-width:_700px)]:border-0 [@media(max-width:_700px)]:rounded-none [@media(max-width:_700px)]:[box-shadow:none] [@media(max-width:_700px)]:[&_h1]:text-[25px] [@media(max-width:_700px)]:[&_.page-head]:mb-[26px] [@media(max-width:_700px)]:[&_label]:text-[13px] [@media(max-width:_700px)]:[&_input]:text-[12px] [@media(max-width:_700px)]:[&_input]:[padding:10px_11px] [@media(max-width:_700px)]:[&_textarea]:text-[12px] [@media(max-width:_700px)]:[&_textarea]:[padding:10px_11px] [@media(max-width:_700px)]:[&_select]:text-[12px] [@media(max-width:_700px)]:[&_select]:[padding:10px_11px]",
  "form-columns":
    'grid [grid-template-columns:1fr_1fr] gap-[13px] [&_input]:min-w-0 [&_input]:max-w-[100%] [@media(max-width:_700px)]:gap-[10px] [@media(max-width:_700px)]:[&_label]:text-[12px] [@media(max-width:_700px)]:[&_input[type="datetime-local"]]:text-[10px] [@media(max-width:_700px)]:[&_input[type="datetime-local"]]:[padding:10px_7px]',
  "form-footer":
    "flex gap-[10px] mt-[28px] [&_.button]:flex-1 [@media(max-width:_700px)]:mt-[25px] [@media(max-width:_700px)]:[&_>_.button]:text-[12px] [@media(max-width:_700px)]:[&_>_.button]:[padding:11px]",
  "location-fields": "[&_>_.campus-map]:mt-[12px] [&_>_.field-hint]:mb-[0]",
  "coordinate-fields":
    "[&_label]:text-[11px] [&_label]:[color:#777] [&_input]:text-[11px]! [&_input]:[padding:9px_11px]",
  "success-state":
    "text-center [padding:40px_28px] [&_>_svg]:[color:#252525] [&_>_svg]:mb-[20px] [&_h1]:text-[26px] [&_p]:text-[13px] [&_.button]:mt-[10px] [@media(max-width:_700px)]:[padding:30px_0] [@media(max-width:_700px)]:[&_h1]:text-[25px]",
  "profile-card":
    "flex items-center gap-[20px] [border:1px_solid_#e5e5e5] [padding:25px] rounded-[10px] [&_h2]:[margin:0_0_4px] [&_p]:text-[12px] [&_p]:[color:#888] [&_p]:[margin:0_0_8px] [@media(max-width:_700px)]:[padding:18px] [@media(max-width:_700px)]:gap-[14px] [@media(max-width:_700px)]:[&_h2]:text-[18px] [@media(max-width:_700px)]:[&_p]:text-[11px]",
  "large-avatar":
    "w-[65px] h-[65px] text-[22px] [@media(max-width:_700px)]:w-[50px] [@media(max-width:_700px)]:h-[50px] [@media(max-width:_700px)]:text-[17px]",
  "profile-data":
    "grid [grid-template-columns:1fr_1fr] gap-[20px] [margin:20px_0_25px] [padding:20px_0] [border-bottom:1px_solid_#eee] [&_>_span]:text-[11px] [&_>_span]:[color:#888] [&_strong]:block [&_strong]:text-[13px] [&_strong]:[color:#444] [&_strong]:font-medium [&_strong]:mt-[7px] [@media(max-width:_700px)]:gap-[15px] [@media(max-width:_700px)]:[&_strong]:text-[12px] [@media(max-width:_700px)]:[&_strong]:leading-[1.6]",
  "profile-actions":
    "flex gap-[10px] mb-[35px] [@media(max-width:_700px)]:flex-col [@media(max-width:_700px)]:[&_.button]:text-[12px]",
  "my-requests":
    "[&_>_.section-title]:mb-[20px] [&_h2]:text-[21px] [&_.section-title_>_span]:text-[12px] [&_.section-title_>_span]:ml-auto [&_.section-title_>_span]:[color:#999]",
  "request-card":
    "[border:1px_solid_#e5e5e5] rounded-[9px] [padding:18px] [margin:12px_0] [&_>_div]:flex [&_>_div]:justify-between [&_>_div]:items-center [&_>_div]:gap-[12px] [&_h3]:text-[14px] [&_h3]:m-0 [&_>_p]:text-[12px] [&_>_p]:[color:#777] [&_>_p]:[margin:12px_0] [&_>_small]:text-[10px] [&_>_small]:[color:#999] [@media(max-width:_700px)]:[padding:15px] [@media(max-width:_700px)]:[&_h3]:text-[13px] [@media(max-width:_700px)]:[&_>_div]:items-start [@media(max-width:_700px)]:[&_.badge]:text-[8px] [@media(max-width:_700px)]:[&_>_p]:text-[11px]",
  "request-response":
    "mt-[15px] [background:#f7f7f7] rounded-[6px] [padding:12px] text-[12px] [color:#737373] leading-[1.7] [&_>_p]:[margin:9px_0_0] [@media(max-width:_700px)]:text-[11px] [@media(max-width:_700px)]:[padding:10px]",
  "demo-settings":
    "[border-top:1px_solid_#eee] pt-[25px] mt-[35px] [&_h3]:text-[14px] [&_p]:text-[12px] [&_p]:[color:#888] [@media(max-width:_700px)]:[&_.inline-actions]:gap-[15px] [@media(max-width:_700px)]:[&_.button]:text-[11px] [@media(max-width:_700px)]:[&_.text-button]:text-[11px]",
  "login-page":
    "max-w-[520px] [@media(max-width:_700px)]:[padding:22px_20px_55px] [@media(max-width:_700px)]:max-w-[440px]",
  "login-card":
    "[padding:30px] [border:1px_solid_#e6e6e6] rounded-[12px] [box-shadow:0_2px_5px_#00000004] [&_>_.brand]:mb-[28px] [&_>_.brand]:text-[21px] [&_>_.brand_>_.brand-icon]:inline-flex [&_>_h1]:text-[28px] [&_>_.muted]:text-[13px] [&_form_>_.button]:mt-[22px] [@media(max-width:_700px)]:[padding:22px_18px] [@media(max-width:_700px)]:[&_>_.brand]:text-[20px] [@media(max-width:_700px)]:[&_>_.brand]:mb-[25px] [@media(max-width:_700px)]:[&_>_.brand_>_.brand-icon]:w-[36px] [@media(max-width:_700px)]:[&_>_.brand_>_.brand-icon]:h-[36px] [@media(max-width:_700px)]:[&_>_.brand_>_.brand-icon]:rounded-[9px] [@media(max-width:_700px)]:[&_>_.brand_>_.brand-icon_svg]:w-[22px] [@media(max-width:_700px)]:[&_h1]:text-[25px] [@media(max-width:_700px)]:[&_input]:text-[12px] [@media(max-width:_700px)]:[&_label]:text-[13px] [@media(max-width:_700px)]:[&_.button]:text-[12px] [@media(max-width:_700px)]:[&_>_.muted]:text-[12px]",
  "password-field":
    "relative [&_input]:pr-[70px] [&_button]:absolute [&_button]:right-[13px] [&_button]:top-[0] [&_button]:h-full [&_button]:text-[10px] [&_button]:border-0 [&_button]:bg-none [&_button]:[color:#888]",
  forgot: "flex [margin:14px_auto]",
  "demo-login":
    "[border-top:1px_solid_#eee] mt-[23px] pt-[23px] [&_p]:text-[11px] [&_p]:[color:#888] [&_p]:leading-[1.7] [&_>_div]:grid [&_>_div]:gap-[9px] [&_>_div]:[margin:14px_0] [&_>_div_>_.button]:text-[12px] [&_>_div_>_.button]:justify-start [&_>_div_>_.button_>_svg:last-child]:ml-auto [&_>_small]:block [&_>_small]:text-[10px] [&_>_small]:leading-[1.8] [&_>_small]:[color:#999]",
  "route-panel":
    "absolute top-[25px] left-[25px] bottom-[25px] overflow-auto max-h-[calc(100%_-_50px)] bg-white [border:1px_solid_#e4e4e4] rounded-[10px] w-[345px] [padding:25px] z-[500] [box-shadow:0_5px_30px_#0001] [scrollbar-width:thin] [&_.back-link]:mb-[20px] [&_h1]:text-[25px] [&_h1]:tracking-[-0.8px] [&_h1]:mb-[23px] [&_>_label]:text-[11px] [&_>_label]:[color:#777] [&_>_label]:mt-[14px] [&_>_.field-hint]:text-[10px] [@media(max-width:_700px)]:order-[1] [@media(max-width:_700px)]:relative [@media(max-width:_700px)]:top-[auto] [@media(max-width:_700px)]:left-[auto] [@media(max-width:_700px)]:bottom-[auto] [@media(max-width:_700px)]:max-h-[none] [@media(max-width:_700px)]:w-full [@media(max-width:_700px)]:border-0 [@media(max-width:_700px)]:[box-shadow:none] [@media(max-width:_700px)]:[padding:22px_22px_35px] [@media(max-width:_700px)]:rounded-none [@media(max-width:_700px)]:overflow-visible [@media(max-width:_700px)]:z-[450] [@media(max-width:_700px)]:[&_h1]:text-[23px] [@media(max-width:_700px)]:[&_h1]:mb-[20px] [@media(max-width:_700px)]:[&_.back-link]:mb-[17px] [@media(max-width:_700px)]:[&_.modal-actions]:flex-row [@media(max-width:_700px)]:[&_label]:text-[12px] [@media(max-width:_700px)]:[&_>_.field-hint]:text-[11px] [@media(max-width:_700px)]:[&_.button]:text-[13px]",
  "route-input":
    "flex items-center gap-[8px] [border:1px_solid_#e4e4e4] rounded-[7px] [padding:0_10px] [&_>_svg]:[color:#999] [&_select]:border-0 [&_select]:pl-[0] [&_select]:text-[11px] [&_select]:[outline:none] [@media(max-width:_700px)]:[&_select]:text-[12px]",
  "route-estimate":
    "flex items-center justify-between [padding:23px_0_17px] mt-[15px] [border-top:1px_solid_#eee] [&_strong]:block [&_strong]:text-[27px] [&_strong]:tracking-[-1px] [&_small]:block [&_small]:[color:#888] [&_small]:text-[11px] [&_small]:mt-[6px] [@media(max-width:_700px)]:[&_strong]:text-[28px]",
  "route-steps":
    "[list-style:none] [margin:20px_0] p-0 grid gap-[19px] [&_>_li]:flex [&_>_li]:gap-[12px] [&_>_li]:items-start [&_strong]:text-[11px] [&_strong]:font-medium [&_strong]:block [&_small]:text-[10px] [&_small]:[color:#999] [&_small]:block [&_small]:mt-[5px] [@media(max-width:_700px)]:[&_strong]:text-[12px] [@media(max-width:_700px)]:[&_small]:text-[11px]",
  "step-dot":
    "w-[14px] h-[14px] [background:#2b9fd0] [border:3px_solid_#dceef6] rounded-full shrink-0",
  "route-screen":
    "[&_>_.campus-map_.map-controls]:right-[17px] [&_>_.campus-map_.map-controls]:top-[17px] [&_>_.campus-map_.map-controls]:bottom-[auto] [@media(max-width:_700px)]:h-[auto] [@media(max-width:_700px)]:min-h-[calc(100dvh_-_var(--header-h))] [@media(max-width:_700px)]:flex [@media(max-width:_700px)]:flex-col [@media(max-width:_700px)]:bg-white [@media(max-width:_700px)]:overflow-visible [@media(max-width:_700px)]:[&_>_.campus-map]:h-[39dvh] [@media(max-width:_700px)]:[&_>_.campus-map]:min-h-[230px] [@media(max-width:_700px)]:[&_>_.campus-map]:order-[0] [@media(max-width:_700px)]:[&_>_.campus-map]:shrink-0 [@media(max-width:_700px)]:[&_>_.campus-map_.map-controls]:right-[15px] [@media(max-width:_700px)]:[&_>_.campus-map_.map-controls]:top-[16px]",
  "admin-page":
    "max-w-[1250px] [margin:0_auto] [padding:27px_35px_70px] [@media(min-width:_1500px)]:pt-[35px] [@media(max-width:_700px)]:[padding:21px_20px_65px] [@media(max-width:_700px)]:[&_.page-head]:mb-[24px] [@media(max-width:_700px)]:[&_.page-head_h1]:text-[28px] [@media(max-width:_700px)]:[&_.page-head_>_.button]:text-[11px] [@media(max-width:_700px)]:[&_.page-head_>_.button]:[padding:9px_12px] [@media(max-width:_700px)]:[&_.page-head_>_.button]:min-h-[36px]",
  "admin-top":
    "flex justify-between items-center mb-[5px] [&_.back-link]:mb-[15px] [@media(max-width:_700px)]:mb-[0] [@media(max-width:_700px)]:[&_.back-link]:text-[10px]",
  "admin-context":
    "flex gap-[6px] items-center text-[10px] [color:#999] mb-[15px] [@media(max-width:_700px)]:text-[8px] [@media(max-width:_700px)]:[&_svg]:w-[12px]",
  "admin-tabs":
    "flex [border-bottom:1px_solid_#e7e7e7] gap-[26px] mb-[33px] overflow-auto [scrollbar-width:thin] [&_>_a]:[padding:14px_0] [&_>_a]:flex [&_>_a]:items-center [&_>_a]:gap-[8px] [&_>_a]:text-[12px] [&_>_a]:whitespace-nowrap [&_>_a]:[border-bottom:2px_solid_transparent] [&_>_a]:[color:#888] [&_>_a.active]:[color:#171717] [&_>_a.active]:[border-color:#171717] [@media(max-width:_1000px)]:gap-[23px] [@media(max-width:_700px)]:[margin:0_-20px_25px] [@media(max-width:_700px)]:[padding:0_20px] [@media(max-width:_700px)]:gap-[23px] [@media(max-width:_700px)]:[&_>_a]:text-[11px] [@media(max-width:_700px)]:[&_>_a]:gap-[6px] [@media(max-width:_700px)]:[&_>_a]:[padding:13px_0] [@media(max-width:_700px)]:[&_>_a_>_svg]:w-[15px]",
  "count-pill":
    "inline-flex items-center justify-center min-w-[18px] h-[18px] [padding:0_4px] [background:#f2f2f2] rounded-[5px] [color:#666] text-[9px]",
  "admin-toolbar":
    "flex gap-[15px] items-center flex-wrap mb-[25px] [&_>_.search-box]:w-[340px] [&_>_.search-box]:max-w-[100%] [&_>_select]:w-[auto] [&_>_select]:min-w-[180px] [&_>_select]:text-[12px] [&_>_label]:m-0 [&_>_label]:text-[11px] [&_>_label]:[color:#888] [&_>_label_>_select]:block [&_>_label_>_select]:min-w-[200px] [&_>_label_>_select]:mt-[7px] [&_>_label_>_select]:text-[12px] [&_>_.muted]:text-[12px] [&_>_.muted]:ml-auto [&_>_.badge]:ml-auto [@media(max-width:_700px)]:gap-[10px] [@media(max-width:_700px)]:mb-[20px] [@media(max-width:_700px)]:items-end [@media(max-width:_700px)]:[&_>_.search-box]:w-full [@media(max-width:_700px)]:[&_>_select]:flex-1 [@media(max-width:_700px)]:[&_>_select]:min-w-0 [@media(max-width:_700px)]:[&_>_select]:text-[11px] [@media(max-width:_700px)]:[&_>_select]:max-w-[100%] [@media(max-width:_700px)]:[&_>_select]:[padding:10px] [@media(max-width:_700px)]:[&_>_label]:flex-1 [@media(max-width:_700px)]:[&_>_label]:min-w-0 [@media(max-width:_700px)]:[&_>_label_>_select]:min-w-0 [@media(max-width:_700px)]:[&_>_label_>_select]:max-w-[100%] [@media(max-width:_700px)]:[&_>_label_>_select]:text-[11px] [@media(max-width:_700px)]:[&_>_label_>_select]:[padding:10px] [@media(max-width:_700px)]:[&_>_.badge]:text-[9px] [@media(max-width:_700px)]:[&_>_.badge]:m-0 [@media(max-width:_700px)]:[&_>_label]:basis-[calc(50%_-_5px)]",
  "stats-grid":
    "grid [grid-template-columns:repeat(4,_minmax(0,_1fr))] gap-[18px] [margin:28px_0] [@media(max-width:_1000px)]:[grid-template-columns:repeat(2,_minmax(0,_1fr))] [@media(max-width:_700px)]:[grid-template-columns:1fr] [@media(max-width:_700px)]:gap-[17px] [@media(max-width:_700px)]:[margin:22px_0]",
  "stat-card":
    "[padding:23px] [border:1px_solid_#e4e4e4] rounded-[12px] [box-shadow:0_2px_4px_#00000005] [&_>_div]:flex [&_>_div]:justify-between [&_>_div]:items-start [&_>_div]:gap-[10px] [&_>_div]:mb-[23px] [&_h2]:text-[14px] [&_h2]:font-medium [&_h2]:tracking-[0] [&_h2]:m-0 [&_h2]:leading-[1.6] [&_>_div_>_svg]:[color:#999] [&_>_div_>_svg]:w-[17px] [&_>_div_>_svg]:mt-[2px] [&_>_strong]:text-[29px] [&_>_strong]:block [&_>_strong]:font-[650] [&_>_strong]:leading-[1.3] [&_>_strong]:tracking-[-1px] [&_>_strong_>_span]:text-[15px] [&_>_strong_>_span]:font-medium [&_>_strong_>_span]:tracking-[-0.3px] [&_>_p]:text-[12px] [&_>_p]:leading-[1.6] [&_>_p]:[color:#999] [&_>_p]:[margin:10px_0_0] [@media(max-width:_700px)]:[padding:22px] [@media(max-width:_700px)]:rounded-[12px] [@media(max-width:_700px)]:[&_>_div]:mb-[18px] [@media(max-width:_700px)]:[&_h2]:text-[16px] [@media(max-width:_700px)]:[&_>_div_>_svg]:hidden [@media(max-width:_700px)]:[&_>_strong]:text-[28px] [@media(max-width:_700px)]:[&_>_strong]:tracking-[-0.8px] [@media(max-width:_700px)]:[&_>_strong_>_span]:text-[23px] [@media(max-width:_700px)]:[&_>_strong_>_span]:font-semibold [@media(max-width:_700px)]:[&_>_p]:text-[14px] [@media(max-width:_700px)]:[&_>_p]:max-w-[250px] [@media(max-width:_700px)]:[&_>_p]:leading-[1.6] [@media(max-width:_700px)]:[&_>_p]:mt-[7px] [@media(max-width:_700px)]:[&_>_p]:[color:#8c8c8c]",
  rankings:
    "grid [grid-template-columns:1fr_1fr] gap-[22px] [margin:27px_0] [@media(max-width:_1000px)]:gap-[17px] [@media(max-width:_700px)]:[grid-template-columns:1fr] [@media(max-width:_700px)]:gap-[18px] [@media(max-width:_700px)]:mt-[23px]",
  "ranking-card":
    "[padding:23px] [border:1px_solid_#e5e5e5] rounded-[12px] [box-shadow:0_2px_4px_#00000005] [&_>_h2]:flex [&_>_h2]:items-center [&_>_h2]:gap-[10px] [&_>_h2]:text-[18px] [&_>_h2]:font-[550] [&_>_h2]:[margin:0_0_20px] [@media(max-width:_1000px)]:[padding:20px] [@media(max-width:_1000px)]:[&_>_h2]:text-[16px] [@media(max-width:_700px)]:[padding:19px] [@media(max-width:_700px)]:[&_>_h2]:text-[18px] [@media(max-width:_700px)]:[&_>_h2]:gap-[9px]",
  "ranking-row":
    "[padding:14px_10px] flex items-center gap-[13px] [border:1px_solid_#e3e3e3] rounded-[7px] [margin:9px_0] [&:hover]:[background:#fafafa] [&:last-child]:mb-[0] [&_>_div]:min-w-0 [&_strong]:block [&_strong]:text-[13px] [&_strong]:font-[450] [&_strong]:leading-[1.5] [&_small]:flex [&_small]:gap-[5px] [&_small]:items-center [&_small]:text-[11px] [&_small]:[color:#888] [&_small]:mt-[5px] [&_>_svg]:ml-auto [&_>_svg]:[color:#aaa] [@media(max-width:_700px)]:[padding:12px] [@media(max-width:_700px)]:[&_strong]:text-[14px] [@media(max-width:_700px)]:[&_strong]:font-normal [@media(max-width:_700px)]:[&_small]:text-[12px]",
  "rank-number": "text-[11px] [color:#aaa] [@media(max-width:_700px)]:hidden",
  "table-wrap":
    "w-full overflow-auto [border:1px_solid_#e5e5e5] rounded-[9px] [@media(max-width:_700px)]:border-0 [@media(max-width:_700px)]:rounded-none [@media(max-width:_700px)]:overflow-visible",
  "table-name":
    "flex items-center gap-[9px] font-medium text-[13px] leading-[1.6] [&_>_svg]:[color:#888] [&_>_svg]:shrink-0 [@media(max-width:_700px)]:text-[14px] [@media(max-width:_700px)]:gap-[6px] [@media(max-width:_700px)]:font-medium",
  "table-subtitle":
    "block [color:#999] text-[10px] mt-[5px] font-normal max-w-[340px] [@media(max-width:_700px)]:text-[11px] [@media(max-width:_700px)]:[margin:4px_0_0] [@media(max-width:_700px)]:max-w-[100%]",
  "description-cell":
    "[color:#8b8b8b] text-[12px] max-w-[430px] [@media(max-width:_700px)]:text-[12px] [@media(max-width:_700px)]:flex-1 [@media(max-width:_700px)]:min-w-0 [@media(max-width:_700px)]:max-w-[none] [@media(max-width:_700px)]:leading-[1.7]",
  "actions-column": "text-right w-[110px]",
  "table-actions":
    "flex items-center gap-[6px] justify-end [@media(max-width:_700px)]:gap-[6px] [@media(max-width:_700px)]:[&_.icon-button]:w-[31px] [@media(max-width:_700px)]:[&_.icon-button]:h-[31px]",
  "checkbox-column": "w-[30px] pr-[0] [&_+_th]:pl-[8px]",
  "selection-bar":
    "flex items-center gap-[20px] [background:#f6f6f6] [border:1px_solid_#e6e6e6] rounded-[7px] mb-[15px] [padding:8px_12px] text-[12px] [&_>_.icon-button]:ml-auto [@media(max-width:_700px)]:[padding:8px_10px] [@media(max-width:_700px)]:gap-[12px] [@media(max-width:_700px)]:text-[10px] [@media(max-width:_700px)]:[&_.text-button]:text-[10px]",
  segmented:
    "flex items-center [border:1px_solid_#e3e3e3] rounded-[7px] [padding:3px] [background:#fafafa] gap-[3px] [&_button]:bg-none [&_button]:border-0 [&_button]:rounded-[4px] [&_button]:[padding:8px_12px] [&_button]:text-[11px] [&_button]:flex [&_button]:items-center [&_button]:gap-[6px] [&_button]:[color:#888] [&_button]:whitespace-nowrap [&_button.active]:bg-white [&_button.active]:[color:#111] [&_button.active]:[box-shadow:0_1px_4px_#00000012] [@media(max-width:_700px)]:w-full [@media(max-width:_700px)]:[&_>_button]:flex-1 [@media(max-width:_700px)]:[&_>_button]:text-[11px]",
  starred: "[color:#e4ad31]",
  "report-count":
    "border-0 bg-none [padding:4px_7px] flex gap-[5px] items-center text-[13px] [&.has-reports]:[background:#fff1f1] [&.has-reports]:rounded-[5px] [&.has-reports]:[color:#dc4555]",
  "report-card":
    "[padding:15px] [border:1px_solid_#e3e3e3] rounded-[8px] mt-[14px] [&_>_strong]:text-[13px] [&_>_strong]:font-[550] [&_p]:text-[12px] [&_p]:[color:#777] [&_p]:leading-[1.7] [&_p]:[margin:8px_0_12px]",
  "users-table":
    "[&_>_tbody_>_tr_>_td_>_strong]:font-medium [&_>_tbody_>_tr_>_td_>_strong]:text-[13px] [&_.button]:whitespace-nowrap [@media(max-width:_700px)]:[&_td:nth-child(2)]:basis-[100%] [@media(max-width:_700px)]:[&_td:nth-child(2)]:text-[10px] [@media(max-width:_700px)]:[&_td:nth-child(2)]:[color:#999] [@media(max-width:_700px)]:[&_.button]:text-[10px] [@media(max-width:_700px)]:[&_.button]:min-h-[33px] [@media(max-width:_700px)]:[&_.button]:[padding:8px] [@media(max-width:_700px)]:[&_.badge]:text-[9px] [@media(max-width:_700px)]:[&_td:nth-child(3)]:mt-[2px] [@media(max-width:_700px)]:[&_td:nth-child(4)]:mt-[2px]",
  "you-label":
    "ml-[8px] text-[9px] [padding:3px_5px] [background:#f3f3f3] rounded-[4px] [color:#999]",
  "requests-grid":
    "grid [grid-template-columns:1fr_1fr] gap-[18px] [@media(max-width:_700px)]:[grid-template-columns:1fr] [@media(max-width:_700px)]:gap-[14px]",
  "request-summary":
    "text-left bg-white [padding:22px] [border:1px_solid_#e4e4e4] rounded-[10px] [box-shadow:0_2px_4px_#00000005] [transition:box-shadow_0.15s] [&:hover]:[box-shadow:0_3px_15px_#0000000c] [&:hover]:[border-color:#ccc] [&_>_small]:text-[10px] [&_>_small]:[color:#999] [&_h3]:text-[16px] [&_h3]:font-medium [&_h3]:[margin:19px_0_9px] [&_>_p]:text-[12px] [&_>_p]:[color:#888] [&_>_p]:leading-[1.7] [&_>_p]:mb-[16px] [@media(max-width:_700px)]:[padding:18px] [@media(max-width:_700px)]:[&_h3]:text-[15px] [@media(max-width:_700px)]:[&_h3]:mt-[15px] [@media(max-width:_700px)]:[&_p]:text-[12px]",
  "request-summary-head":
    "flex items-center justify-between gap-[12px] mb-[5px] [&_strong]:text-[14px] [&_strong]:font-[550] [@media(max-width:_700px)]:[&_strong]:text-[13px]",
  "request-summary-foot":
    "text-[10px] [color:#999] flex items-center justify-between [border-top:1px_solid_#eee] pt-[12px]",
  "request-detail":
    "[&_p]:text-[12px] [&_p]:leading-[1.7] [&_p]:[color:#777] [&_p]:mb-[10px] [&_strong]:font-[550] [&_strong]:[color:#333] [@media(max-width:_700px)]:[&_p]:text-[11px]",
  "request-review-actions":
    "grid gap-[9px] mt-[17px] [&_>_.checkbox-label]:[margin:0_0_10px]",
  "decision-box":
    "mt-[20px] [border-top:1px_solid_#eee] pt-[16px] [&_>_p]:text-[13px]",
  "logout-desktop": "[@media(max-width:_1000px)]:hidden",
  "toast-warning": "[background:#db3547]",
};

/** Every utility is a complete literal so Tailwind can discover it at build time. */
export function tw(tokens: string): string {
  return tokens
    .trim()
    .split(/\s+/)
    .map((token) => (recipes[token] ? `${token} ${recipes[token]}` : token))
    .join(" ");
}
