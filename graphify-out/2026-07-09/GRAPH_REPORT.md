# Graph Report - /Users/feliperestrepo/Desktop/Antigravity/RevUp/revup-digital-growth  (2026-07-09)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 644 nodes · 1003 edges · 43 communities (41 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- AdminDashboardPage.tsx
- kit.tsx
- dependencies
- sidebar.tsx
- ROASCalculatorPage.tsx
- OnboardingForm.tsx
- devDependencies
- use-toast.ts
- carousel.tsx
- App.tsx
- compilerOptions
- utils.ts
- cn
- components.json
- compilerOptions
- compilerOptions
- menubar.tsx
- index.ts
- context-menu.tsx
- dropdown-menu.tsx
- alert-dialog.tsx
- table.tsx
- breadcrumb.tsx
- drawer.tsx
- navigation-menu.tsx
- index.ts
- google-apps-script.js
- toggle-group.tsx
- index.ts
- input-otp.tsx
- alert.tsx
- accordion.tsx
- tabs.tsx
- scroll-area.tsx
- deno.json

## God Nodes (most connected - your core abstractions)
1. `cn()` - 78 edges
2. `compilerOptions` - 19 edges
3. `openCalendly()` - 18 edges
4. `Button` - 14 edges
5. `compilerOptions` - 14 edges
6. `Navbar()` - 11 edges
7. `Footer()` - 10 edges
8. `Eyebrow()` - 10 edges
9. `Reveal()` - 9 edges
10. `AdminDashboardPage()` - 9 edges

## Surprising Connections (you probably didn't know these)
- `useCarousel()` --references--> `react`  [EXTRACTED]
  src/components/ui/carousel.tsx → package.json
- `useChart()` --references--> `react`  [EXTRACTED]
  src/components/ui/chart.tsx → package.json
- `useFormField()` --references--> `react`  [EXTRACTED]
  src/components/ui/form.tsx → package.json
- `useSidebar()` --references--> `react`  [EXTRACTED]
  src/components/ui/sidebar.tsx → package.json
- `useIsMobile()` --references--> `react`  [EXTRACTED]
  src/hooks/use-mobile.tsx → package.json

## Import Cycles
- None detected.

## Communities (43 total, 2 thin omitted)

### Community 0 - "AdminDashboardPage.tsx"
Cohesion: 0.06
Nodes (45): Badge(), BadgeProps, badgeVariants, Command, CommandEmpty, CommandGroup, CommandInput, CommandItem (+37 more)

### Community 1 - "kit.tsx"
Cohesion: 0.07
Nodes (44): BrandCard(), BrandCardProps, CORNER_CLASS, DeviceArrow(), DeviceAsterisk(), DeviceCircles(), DeviceProps, DeviceSquareCircle() (+36 more)

### Community 2 - "dependencies"
Cohesion: 0.04
Nodes (49): dependencies, class-variance-authority, clsx, cmdk, date-fns, embla-carousel-react, framer-motion, @hookform/resolvers (+41 more)

### Community 3 - "sidebar.tsx"
Cohesion: 0.05
Nodes (38): Separator, SheetContent, SheetContentProps, SheetDescription, SheetFooter(), SheetHeader(), SheetOverlay, SheetTitle (+30 more)

### Community 4 - "ROASCalculatorPage.tsx"
Cohesion: 0.15
Nodes (22): EASE, Footer(), QUICK_LINKS, Navbar(), ThemeToggle(), Button, Card, CardContent (+14 more)

### Community 5 - "OnboardingForm.tsx"
Cohesion: 0.07
Nodes (29): ALLOWED_TYPES, FormData, FormErrors, INITIAL, isUrl(), OnboardingForm(), sanitize(), validFile() (+21 more)

### Community 6 - "devDependencies"
Cohesion: 0.07
Nodes (28): devDependencies, autoprefixer, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, lovable-tagger (+20 more)

### Community 7 - "use-toast.ts"
Cohesion: 0.12
Nodes (24): Toast, ToastAction, ToastActionElement, ToastClose, ToastDescription, ToastProps, ToastTitle, toastVariants (+16 more)

### Community 8 - "carousel.tsx"
Cohesion: 0.07
Nodes (23): react, Carousel, CarouselApi, CarouselContent, CarouselContext, CarouselContextProps, CarouselItem, CarouselNext (+15 more)

### Community 9 - "App.tsx"
Cohesion: 0.09
Nodes (19): sonner, AboutPage, AdminDashboardPage, AdminLoginPage, Index, NotFound, OnboardingPage, PartnersPage (+11 more)

### Community 10 - "compilerOptions"
Cohesion: 0.09
Nodes (21): compilerOptions, allowImportingTsExtensions, baseUrl, isolatedModules, jsx, lib, module, moduleDetection (+13 more)

### Community 11 - "utils.ts"
Cohesion: 0.10
Nodes (12): NavLink, NavLinkCompatProps, Avatar, AvatarFallback, AvatarImage, HoverCardContent, PopoverContent, Progress (+4 more)

### Community 12 - "cn"
Cohesion: 0.18
Nodes (15): ButtonProps, buttonVariants, Calendar(), CalendarProps, Pagination(), PaginationContent, PaginationEllipsis(), PaginationItem (+7 more)

### Community 13 - "components.json"
Cohesion: 0.12
Nodes (16): aliases, components, hooks, lib, ui, utils, rsc, $schema (+8 more)

### Community 14 - "compilerOptions"
Cohesion: 0.12
Nodes (15): compilerOptions, allowImportingTsExtensions, isolatedModules, lib, module, moduleDetection, moduleResolution, noEmit (+7 more)

### Community 15 - "compilerOptions"
Cohesion: 0.15
Nodes (12): compilerOptions, allowJs, baseUrl, noImplicitAny, noUnusedLocals, noUnusedParameters, paths, skipLibCheck (+4 more)

### Community 16 - "menubar.tsx"
Cohesion: 0.17
Nodes (11): Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarLabel, MenubarRadioItem, MenubarSeparator, MenubarShortcut() (+3 more)

### Community 17 - "index.ts"
Cohesion: 0.24
Nodes (10): ALLOWED_MIME_TYPES, checkRateLimit(), corsHeaders, fileSchema, formSchema, handler(), normalizeChoice(), sanitizeUrl() (+2 more)

### Community 18 - "context-menu.tsx"
Cohesion: 0.20
Nodes (9): ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut(), ContextMenuSubContent (+1 more)

### Community 19 - "dropdown-menu.tsx"
Cohesion: 0.20
Nodes (9): DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut(), DropdownMenuSubContent (+1 more)

### Community 20 - "alert-dialog.tsx"
Cohesion: 0.22
Nodes (8): AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter(), AlertDialogHeader(), AlertDialogOverlay, AlertDialogTitle

### Community 21 - "table.tsx"
Cohesion: 0.22
Nodes (8): Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow

### Community 22 - "breadcrumb.tsx"
Cohesion: 0.25
Nodes (7): Breadcrumb, BreadcrumbEllipsis(), BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator()

### Community 23 - "drawer.tsx"
Cohesion: 0.25
Nodes (6): DrawerContent, DrawerDescription, DrawerFooter(), DrawerHeader(), DrawerOverlay, DrawerTitle

### Community 24 - "navigation-menu.tsx"
Cohesion: 0.25
Nodes (7): NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, NavigationMenuViewport

### Community 25 - "index.ts"
Cohesion: 0.32
Nodes (7): checkRateLimit(), ContactEmailRequest, contactSchema, corsHeaders, handler(), persistSubmission(), supabase

### Community 26 - "google-apps-script.js"
Cohesion: 0.43
Nodes (4): doPost(), saveFileToDrive(), saveToSheet(), sendNotificationEmail()

### Community 27 - "toggle-group.tsx"
Cohesion: 0.33
Nodes (5): ToggleGroup, ToggleGroupContext, ToggleGroupItem, Toggle, toggleVariants

### Community 28 - "index.ts"
Cohesion: 0.38
Nodes (6): checkRateLimit(), corsHeaders, handler(), insertLead(), leadSchema, supabase

### Community 29 - "input-otp.tsx"
Cohesion: 0.33
Nodes (5): input-otp, InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot

### Community 30 - "alert.tsx"
Cohesion: 0.40
Nodes (4): Alert, AlertDescription, AlertTitle, alertVariants

### Community 31 - "accordion.tsx"
Cohesion: 0.50
Nodes (3): AccordionContent, AccordionItem, AccordionTrigger

### Community 32 - "tabs.tsx"
Cohesion: 0.50
Nodes (3): TabsContent, TabsList, TabsTrigger

## Knowledge Gaps
- **378 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+373 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `AdminDashboardPage.tsx`, `kit.tsx`, `sidebar.tsx`, `ROASCalculatorPage.tsx`, `OnboardingForm.tsx`, `use-toast.ts`, `carousel.tsx`, `utils.ts`, `menubar.tsx`, `context-menu.tsx`, `dropdown-menu.tsx`, `alert-dialog.tsx`, `table.tsx`, `breadcrumb.tsx`, `drawer.tsx`, `navigation-menu.tsx`, `toggle-group.tsx`, `input-otp.tsx`, `alert.tsx`, `accordion.tsx`, `tabs.tsx`, `scroll-area.tsx`?**
  _High betweenness centrality (0.268) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `carousel.tsx`, `App.tsx`, `input-otp.tsx`, `devDependencies`?**
  _High betweenness centrality (0.183) - this node is a cross-community bridge._
- **Why does `input-otp` connect `input-otp.tsx` to `dependencies`?**
  _High betweenness centrality (0.091) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _378 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `AdminDashboardPage.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05513784461152882 - nodes in this community are weakly interconnected._
- **Should `kit.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.04081632653061224 - nodes in this community are weakly interconnected._