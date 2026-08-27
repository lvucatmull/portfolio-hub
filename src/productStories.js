export const PRODUCT_STORIES = {
  "ray-tracing-scene-lab": {
    id: "ray-tracing-scene-lab",
    category: "GPU rendering laboratory",
    title: "Ray Tracing Scene Lab",
    lead:
      "A hands-on rendering workspace that turns path-tracing behavior into something people can see, control, and diagnose instead of treating the final image as a black box.",
    audience:
      "Graphics engineers and technically curious reviewers who want to understand how sampling, materials, camera changes, and render targets affect an image.",
    promise: "Make physically based rendering observable from the first sample to the final frame.",
    facts: [
      { value: "2", label: "reproducible scenes" },
      { value: "3", label: "material responses" },
      { value: "3", label: "debug views" },
      { value: "Progressive", label: "sample accumulation" },
    ],
    journey: [
      { title: "Choose a scene", description: "Start from the Cornell fixture or the concrete atrium reference scene." },
      { title: "Frame the image", description: "Orbit and zoom while the renderer resets only the invalidated accumulation." },
      { title: "Tune the trace", description: "Change bounce count, resolution scale, material behavior, and playback state." },
      { title: "Read the result", description: "Compare beauty, normal, and depth views with live frame diagnostics." },
    ],
    capabilities: [
      { title: "Progressive image", description: "Ping-pong accumulation makes the image converge visibly instead of hiding sampling work." },
      { title: "Material study", description: "Diffuse, metallic, and dielectric paths make surface response easy to compare." },
      { title: "Renderer diagnostics", description: "Beauty, normal, depth, FPS, frame, path, and buffer states expose why a frame looks wrong." },
      { title: "Failure-aware canvas", description: "Unsupported WebGL2 environments get a readable recovery state rather than a black viewport." },
    ],
    evidence: [
      "Raw WebGL2 and GLSL renderer with RGBA16F accumulation when supported.",
      "Camera and sampling changes reset accumulation at explicit product boundaries.",
      "Two checked-in scenes keep visual review reproducible without external assets.",
    ],
    boundary:
      "The current product traces procedural geometry. Triangle meshes, BVH traversal, streaming, and a WebGPU wavefront comparison remain planned work and are not presented as implemented.",
  },
  "airspace-replay": {
    id: "airspace-replay",
    category: "Geospatial replay product",
    title: "Airspace Replay",
    lead:
      "A one-year synthetic aviation replay that lets people move through time, inspect individual aircraft, and understand both the visual story and the cost of delivering it.",
    audience:
      "Visualization engineers and reviewers evaluating large moving datasets, linked views, bounded streaming, and browser GPU behavior.",
    promise: "Explore a large time-based world without turning the browser into an unbounded data sink.",
    facts: [
      { value: "1 year", label: "replay horizon" },
      { value: "1,200", label: "aircraft instances" },
      { value: "4,096", label: "optional satellites" },
      { value: "20 min", label: "bounded data window" },
    ],
    journey: [
      { title: "Pick a moment", description: "Scrub the annual timeline or choose a playback speed from a paused default." },
      { title: "Load a window", description: "The viewer requests a bounded, repeatable HTTP partition around that time." },
      { title: "Explore the globe", description: "Orbit the Earth, switch visibility layers, and select a moving aircraft." },
      { title: "Connect the views", description: "Read route, altitude, telemetry, analytics, and system state for the same selection." },
    ],
    capabilities: [
      { title: "Linked exploration", description: "Globe, inspector, altitude profile, annual timeline, and telemetry stay synchronized." },
      { title: "Bounded streaming", description: "Twenty-minute immutable windows and a four-entry cache keep random access predictable." },
      { title: "GPU-sized layers", description: "Instancing renders a stable representative budget rather than creating thousands of DOM nodes." },
      { title: "Idle-safe playback", description: "The default paused state renders on demand so an untouched portfolio tab does not burn GPU cycles." },
    ],
    evidence: [
      "Deterministic synthetic routes make the full experience reproducible without API keys or a misleading live-data claim.",
      "Aircraft and satellite payloads are separate, measurable layers with visibility-controlled work.",
      "The current Git history includes global route distribution and a separately switchable satellite layer.",
    ],
    boundary:
      "The moving tracks are synthetic and the orbital positions are visualization-grade approximations. The product is a replay and performance case study, not an operational flight tracker or navigation system.",
  },
  "my-linear": {
    id: "my-linear",
    category: "Local-first desktop workspace",
    title: "my linear",
    lead:
      "A desktop issue workspace designed so navigation, search, and editing stay useful immediately, even while the network is slow or unavailable.",
    audience:
      "Product engineers and small teams who value a fast keyboard-driven workspace without making every interaction wait for a server round trip.",
    promise: "Keep the interaction path local; synchronize deliberately in the background.",
    facts: [
      { value: "Local-first", label: "interaction model" },
      { value: "IndexedDB", label: "workspace source" },
      { value: "Electron", label: "desktop boundary" },
      { value: "OIDC + PKCE", label: "sign-in flow" },
    ],
    journey: [
      { title: "Open the workspace", description: "Projects, views, issues, labels, and inbox state load from the local database." },
      { title: "Work immediately", description: "Create, edit, search, and navigate without putting the network on the input path." },
      { title: "Queue the change", description: "The entity update and its outbound mutation are committed together locally." },
      { title: "Reconcile later", description: "Background push and cursor pull synchronize accepted work and surface conflicts in the inbox." },
    ],
    capabilities: [
      { title: "Issue workspace", description: "List, detail inspector, projects, labels, views, search, and quick-create form one continuous desktop flow." },
      { title: "Durable local writes", description: "Entity changes and mutation records share a transaction, preventing a closed app from losing sync intent." },
      { title: "Observable synchronization", description: "Pending, accepted, conflict, and cursor states remain visible instead of being collapsed into a vague saved flag." },
      { title: "Narrow security boundary", description: "The sandboxed renderer never owns refresh tokens; Electron main attaches credentials to allowlisted requests." },
    ],
    evidence: [
      "The checked-in workspace implements local-first issue surfaces and background synchronization boundaries.",
      "Product, data, authentication, sync, testing, and QA documents are versioned with the application.",
      "The repository includes contract checks and Electron-focused end-to-end coverage.",
    ],
    boundary:
      "Conflict handling is intentionally entity-level and explicit. Field-wise merging, CRDT collaboration, and a claim of fully offline multi-user convergence are outside the current product.",
  },
  taedong: {
    id: "taedong",
    category: "Native tennis community",
    title: "Taedong (테동)",
    lead:
      "A mobile tennis community that brings nearby courts, level-aware partners, clubs, and meetup creation into one map-led experience.",
    audience:
      "Tennis players who need to find a suitable place, time, and level match without moving between maps, chat rooms, and separate club services.",
    promise: "Turn nearby courts and compatible players into a joinable tennis plan.",
    facts: [
      { value: "iOS · Android", label: "native targets" },
      { value: "NTRP", label: "level matching" },
      { value: "Map-first", label: "discovery model" },
      { value: "Offline seed", label: "demo recovery" },
    ],
    journey: [
      { title: "Discover nearby play", description: "Open the home map and scan today's recruiting meetups around real court coordinates." },
      { title: "Check the fit", description: "Review court details, participants, average NTRP, remaining seats, and match format." },
      { title: "Join or create", description: "Join an open meetup or define court, date, time, level range, format, and capacity." },
      { title: "Build community", description: "Find level-matched friends and clubs, then track upcoming plans in My Schedule." },
    ],
    capabilities: [
      { title: "Native court map", description: "Map pins and meetup cards share the same source so place and event context stay aligned." },
      { title: "Level-aware decisions", description: "NTRP range, participant average, and remaining capacity help players judge a meetup before joining." },
      { title: "Complete meetup loop", description: "Discovery, detail, join, create, and schedule management are implemented as one navigable product flow." },
      { title: "Resilient demo mode", description: "When the Node API is unavailable, seeded data preserves reading, joining, and creation for portfolio review." },
    ],
    evidence: [
      "The Git history records a rebuild from a browser prototype into an Expo native application.",
      "The product targets Expo SDK 54, React Native, native maps, Express, Zod, and Storybook.",
      "Spec, component, app-flow, Storybook, and native export quality gates are defined in the repository.",
    ],
    boundary:
      "Court booking and payment, production chat and push delivery, social login, official NTRP verification, and persistent production storage are explicitly outside the current MVP.",
  },
  "vertex-studio-cad": {
    id: "vertex-studio-cad",
    category: "Browser-native CAD / DCC workspace",
    title: "Vertex Studio CAD",
    lead:
      "A browser CAD and digital-content workspace proving that computed geometry, rig controls, morphing, animation, UI, and GPU rendering can live in one C++ WebAssembly runtime.",
    audience:
      "Graphics and CAD engineers evaluating a native-style browser tool where geometry ownership and runtime boundaries matter as much as the visible viewport.",
    promise: "Edit a real computed CAD document in the browser, then inspect rigged assets without cloning mesh data into JavaScript.",
    facts: [
      { value: "C++ WASM", label: "runtime owner" },
      { value: "WebGPU", label: "direct renderer" },
      { value: "2", label: "fully rigged assets" },
      { value: "3", label: "morph algorithms" },
    ],
    journey: [
      { title: "Open computed CAD", description: "Start on a rectangle sketch extruded into a solid with a cylindrical through-hole cut." },
      { title: "Edit the features", description: "Change sketch, extrusion, or cut parameters and rebuild topology and tessellation in C++." },
      { title: "Inspect controls", description: "Read CAD feature controls or switch to robot assets with visible joints and bone links." },
      { title: "Animate the result", description: "Play keyed motion and apply blend, RBF, or lattice morphing inside the same mesh arena." },
    ],
    capabilities: [
      { title: "Live parametric proof", description: "The opening document is computed from sketch, extrusion, and cut parameters rather than displayed as an image." },
      { title: "One native workspace", description: "Dear ImGui, CAD evaluation, rigging, morphing, timeline, and rendering run inside the C++ WASM module." },
      { title: "Rig-visible assets", description: "The industrial arm and quadruped carry real glTF skins, complete vertex weights, joints, and animation clips." },
      { title: "Direct WebGPU output", description: "WGSL mesh and rig pipelines consume C++-owned buffers without creating a JavaScript mesh representation." },
    ],
    evidence: [
      "CAD kernel tests cover sketch, extrusion, cylindrical cut, and invalid topology cases.",
      "Every showcase vertex is weighted, with 51 robot-arm skins and 91 quadruped skins validated from binary accessors.",
      "Browser QA confirms the CAD part and both rigged models render and animate through the WebGPU backend.",
    ],
    boundary:
      "The in-repository geometry engine is a lightweight parametric analytic-solid kernel, not a full OCCT-class B-Rep kernel. Exact STEP/IGES exchange, general booleans, and manufacturing-grade fillets remain future scope.",
  },
};
