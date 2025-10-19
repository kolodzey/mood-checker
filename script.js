// Data - Moods array
const MOODS = [
  {
    id: "calm",
    d: {
      mouth: "M180 102.5c-16.5 53-80 52-122-6",
      leftEye: "M108.5 67c-16 15-37 11-47.5-4.5",
      rightEye: "M184.5 59c-16 16.5-36 19.5-47 4",
    },
  },

  {
    id: "happy",
    d: {
      mouth: "M188 107c-39.5 63.5-91 64-121.5-6.5",
      leftEye: "M116 75c-12.5-21-30.5-17.5-41.5-6",
      rightEye: "M181.5 84c-10-27-34.5-17-40.5-8",
    },
    circles: {
      leftCheek: { cx: "55", cy: "105", r: "25" },
      rightCheek: { cx: "208.5", cy: "117.5", r: "30.5" },
    },
  },

  {
    id: "excited",
    d: {
      mouth: "M164.5 120c-30 42-102 43.5-116.5-22.5",
      leftEyeStar:
        "m84.882 26 13.405 16.634 21.323 1.332-11.679 17.89 5.322 20.69-20.622-5.58-18.033 11.456-1.067-21.337-16.467-13.61 19.963-7.609z",
      rightEyeStar:
        "m164.238 42.211 11.418 18.057 21.031 3.758-13.645 16.439 2.925 21.163-19.851-7.897-19.223 9.321 1.376-21.32-14.805-15.401 20.701-5.28z",
    },
  },

  {
    id: "sleepy",
    d: {
      mouthOpen:
        "M114.941 123.021c10.434-2.865 23.449 4.856 27.625 20.067s-3.072 28.496-13.507 31.361c-10.434 2.864-23.45-4.857-27.625-20.069s3.072-28.495 13.507-31.359Z",
      leftEye: "M108.5 80c-16 15-37 11-47.5-4.5",
      rightEye: "M184.5 72c-16 16.5-36 19.5-47 4",
      zSmall:
        "M153 33.5h19c.891 0 1.337 1.077.707 1.707l-18 18c-.63.63-.184 1.707.707 1.707H176",
      zBig: "M197 15h23.534a1 1 0 0 1 .808 1.589L198.158 45.41a1 1 0 0 0 .808 1.589H226",
    },
  },

  {
    id: "sad",
    d: {
      mouth: "M179 136c-34.5-33-80.5-29-96.5 3",
      leftEye: "M98 81c-9.5 14-26 13-35 5.5",
      rightEye: "M186 74.5c-7 9-20.5 15-36.5 5",
      leftBrow: "M57 70.5c12-6 18-11 24-22",
      rightBrow: "M152.562 42.006C159 52.5 168 58 183.201 56.28",
    },
  },

  {
    id: "angry",
    d: {
      mouth: "M179.5 130C155 78 88 93 63.5 157",
      leftBrow: "M107 54c-14-5-24.5-5.5-37.5-5",
      rightBrow: "M163 37.5c-13.001 4.5-19 8-29.5 16.5",
    },
    ellipses: {
      leftEyeOpen: {
        cx: 93.601,
        cy: 65,
        rx: 10.545,
        ry: 13.703,
        transform: "rotate(7.75 93.6 65)",
      },
      rightEyeOpen: {
        cx: 149.374,
        cy: 60.356,
        rx: 10.545,
        ry: 13.703,
        transform: "rotate(-18.657 149.374 60.356)",
      },
    },
  },

  {
    id: "worried",
    d: {
      mouth: "M197 114.5c-30-13.5-76-5-114.5 30",
      leftBrow: "M74.095 63.987c12.906-7.38 20.116-15.028 28.194-25.226",
      rightBrow: "M161.853 41.82c8.556 10.774 13.847 15.273 25.347 22.362",
    },
    ellipses: {
      leftEyeOpen: {
        cx: 113.911,
        cy: 70.077,
        rx: 10.545,
        ry: 13.703,
        transform: "rotate(-15.988 113.911 70.077)",
      },
      rightEyeOpen: {
        cx: 156.374,
        cy: 72.356,
        rx: 10.545,
        ry: 13.703,
        transform: "rotate(-18.657 156.374 72.356)",
      },
    },
  },
];

// -------- setup --------
const $ = (s) => document.querySelector(s);
const HAS_MORPH = !!(gsap.plugins && gsap.plugins.MorphSVGPlugin);

// Core selectors you show most often
const CORE = ["#leftEye", "#rightEye", "#mouth"];

// Things to hide by default
const HIDABLE = [
  "#leftCheek",
  "#rightCheek",
  "#mouthOpen",
  "#zSmall",
  "#zBig",
  "#leftBrow",
  "#rightBrow",
  "#leftEyeOpen",
  "#rightEyeOpen",
  "#leftEyeStar",
  "#rightEyeStar",
];

// ---- helpers ----
// Add a safe offset whether 'at' is a number or a label string
const offset = (at, add = 0) =>
  typeof at === "string" ? `${at}+=${add}` : (at || 0) + add;

// timeline-based helpers (must pass tl)
const show = (tl, targets, at = 0, dur = 0.25) =>
  tl.to(targets, { autoAlpha: 1, duration: dur, ease: "power2.out" }, at);

const hide = (tl, targets, at = 0, dur = 0.25) =>
  tl.to(targets, { autoAlpha: 0, duration: dur, ease: "power1.out" }, at);

const setAttr = (tl, target, attrs, at = 0) =>
  tl.set(target, { attr: attrs }, at);

// Safe morph: uses MorphSVG if present, else set+fade (never snaps)
function morphPath(tl, target, d, at = 0, dur = 0.9) {
  if (!d) return tl;
  if (HAS_MORPH) {
    tl.to(target, { duration: dur, ease: "power2.inOut", morphSVG: d }, at);
  } else {
    setAttr(tl, target, { d }, at);
    tl.to(
      target,
      { autoAlpha: 1, duration: Math.min(0.35, dur * 0.5), ease: "power2.out" },
      offset(at, 0.05) // <-- safe label/number offset
    );
  }
  return tl;
}

// Initialize once for a mood
function setInitial(mood) {
  ["leftEye", "rightEye", "mouth"].forEach((k) => {
    if (mood.d[k]) document.getElementById(k).setAttribute("d", mood.d[k]);
  });
  gsap.set(CORE, { autoAlpha: 1 });
  gsap.set(HIDABLE, { autoAlpha: 0 });
  $("#mood").textContent = mood.id;
}

function morphTo(mood, dur = 0.9) {
  const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
  tl.addLabel("start", 0);

  // ---- Eyes (closed paths) ----
  ["leftEye", "rightEye"].forEach((k) => {
    if (mood.d[k]) morphPath(tl, "#" + k, mood.d[k], "start", dur);
  });

  // ---- Mouth: either open (cross-fade) or morph closed ----
  if (mood.d.mouthOpen) {
    setAttr(tl, "#mouthOpen", { d: mood.d.mouthOpen }, "start");
    hide(tl, "#mouth", "start+=0.05", 0.2);
    tl.fromTo(
      "#mouthOpen",
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.3, ease: "power2.out" },
      "start+=0.15"
    );
  } else if (mood.d.mouth) {
    morphPath(tl, "#mouth", mood.d.mouth, "start", dur);
    hide(tl, "#mouthOpen", "start", 0.2);
  } else {
    hide(tl, ["#mouth", "#mouthOpen"], "start", 0.2);
  }

  // ---- Cheeks (present only on some moods) ----
  const cheeks = mood.circles;
  if (cheeks?.leftCheek && cheeks?.rightCheek) {
    setAttr(tl, "#leftCheek", cheeks.leftCheek, "start");
    setAttr(tl, "#rightCheek", cheeks.rightCheek, "start");
    tl.fromTo(
      ["#leftCheek", "#rightCheek"],
      { autoAlpha: 0, scale: 0.96, transformOrigin: "50% 50%" },
      { autoAlpha: 1, scale: 1, duration: 0.35, ease: "power2.out" },
      `start+=${(dur * 0.6).toFixed(2)}`
    );
  } else {
    hide(tl, ["#leftCheek", "#rightCheek"], "start");
  }

  // ---- Star eyes (excited) ----
  if (mood.d.leftEyeStar && mood.d.rightEyeStar) {
    setAttr(tl, "#leftEyeStar", { d: mood.d.leftEyeStar }, "start");
    setAttr(tl, "#rightEyeStar", { d: mood.d.rightEyeStar }, "start");
    hide(tl, ["#leftEye", "#rightEye"], "start+=0.1", 0.22);
    tl.fromTo(
      ["#leftEyeStar", "#rightEyeStar"],
      { autoAlpha: 0, rotate: 0, transformOrigin: "50% 50%" },
      { autoAlpha: 1, duration: 0.35, ease: "power2.out" },
      "start+=0.2"
    )
      .to(
        ["#leftEyeStar", "#rightEyeStar"],
        { rotate: 8, duration: 0.12, ease: "power1.out" },
        ">0.8"
      )
      .to(
        ["#leftEyeStar", "#rightEyeStar"],
        { rotate: 0, duration: 0.16, ease: "power1.in" },
        ">"
      );
  } else {
    hide(tl, ["#leftEyeStar", "#rightEyeStar"], "start");
    // ensure regular eyes are visible if defined
    if (mood.d.leftEye) show(tl, "#leftEye", "start+=0.1");
    if (mood.d.rightEye) show(tl, "#rightEye", "start+=0.1");
  }

  // ---- Zs (sleepy) ----
  if (mood.d.zSmall && mood.d.zBig) {
    setAttr(tl, "#zSmall", { d: mood.d.zSmall }, "start");
    setAttr(tl, "#zBig", { d: mood.d.zBig }, "start");
    tl.fromTo(
      "#zSmall",
      { autoAlpha: 0, y: 0 },
      { autoAlpha: 1, y: -6, duration: 0.45, ease: "power1.out" },
      `start+=${(dur * 0.55).toFixed(2)}`
    ).fromTo(
      "#zBig",
      { autoAlpha: 0, y: 0 },
      { autoAlpha: 1, y: -10, duration: 0.55, ease: "power1.out" },
      ">-0.30"
    );
  } else {
    hide(tl, ["#zSmall", "#zBig"], "start", 0.3);
  }

  // ---- Brows (sad/angry/worried) ----
  if (mood.d.leftBrow && mood.d.rightBrow) {
    setAttr(tl, "#leftBrow", { d: mood.d.leftBrow }, "start");
    setAttr(tl, "#rightBrow", { d: mood.d.rightBrow }, "start");
    tl.fromTo(
      "#leftBrow",
      { autoAlpha: 0, y: 0 },
      { autoAlpha: 1, y: -6, duration: 0.45, ease: "power1.out" },
      `start+=${(dur * 0.5).toFixed(2)}`
    ).fromTo(
      "#rightBrow",
      { autoAlpha: 0, y: 0 },
      { autoAlpha: 1, y: -10, duration: 0.55, ease: "power1.out" },
      ">-0.30"
    );
  } else {
    hide(tl, ["#leftBrow", "#rightBrow"], "start", 0.35);
  }

  // ---- Open eyes (angry/worried) ----
  if (mood.ellipses?.leftEyeOpen && mood.ellipses?.rightEyeOpen) {
    hide(
      tl,
      ["#leftEye", "#rightEye", "#leftEyeStar", "#rightEyeStar"],
      "start+=0.05",
      0.2
    );
    setAttr(tl, "#leftEyeOpen", mood.ellipses.leftEyeOpen, "start");
    setAttr(tl, "#rightEyeOpen", mood.ellipses.rightEyeOpen, "start");
    show(tl, ["#leftEyeOpen", "#rightEyeOpen"], "start+=0.15", 0.25);
  } else {
    hide(tl, ["#leftEyeOpen", "#rightEyeOpen"], "start", 0.22);
  }

  // label text
  tl.call(
    () => {
      $("#mood").textContent = mood.id;
    },
    null,
    `start+=${(dur * 0.7).toFixed(2)}`
  );

  return tl;
}

const calm = MOODS.find((m) => m.id === "calm");
const happy = MOODS.find((m) => m.id === "happy");
const excited = MOODS.find((m) => m.id === "excited");
const sleepy = MOODS.find((m) => m.id === "sleepy");
const sad = MOODS.find((m) => m.id === "sad");
const angry = MOODS.find((m) => m.id === "angry");
const worried = MOODS.find((m) => m.id === "worried");

const tl = gsap.timeline({ repeat: -1 });

// Calm -> Happy -> Excited -> Sleepy -> Sad -> Angry -> Calm
tl.add(morphTo(calm, 1.5))
  .to({}, { duration: 1.0 })
  .add(morphTo(happy, 1.5))
  .to({}, { duration: 1.0 })
  .add(morphTo(excited, 1.5))
  .to({}, { duration: 1.0 })
  .add(morphTo(sleepy, 1.5))
  .to({}, { duration: 1.0 })
  .add(morphTo(sad, 1.5))
  .to({}, { duration: 1.0 })
  .add(morphTo(angry, 1.5))
  .to({}, { duration: 1.0 })
  .add(morphTo(worried, 1.5))
  .to({}, { duration: 1.0 });

// buttons
byId("stop-btn")?.addEventListener("click", () => tl.pause());
byId("restart-btn")?.addEventListener("click", () => tl.resume());

// reduce motion
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  tl.pause();
}
