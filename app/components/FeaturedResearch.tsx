"use client";

import {
  type CSSProperties,
  type ReactNode,
  useState,
} from "react";

import { createPortal } from "react-dom";

/* ==========================================================================
   TYPES
   ========================================================================== */

type Status =
  | "complete"
  | "current"
  | "future";

type Accent =
  | "neutral"
  | "blue"
  | "green"
  | "red"
  | "gold";

type PopupPreference =
  | "top"
  | "right"
  | "bottom"
  | "left";

type DecorationType =
  | "note"
  | "arrow"
  | "asterisk"
  | "underline"
  | "spark";

type Stage = {
  id: string;
  label: string;
  status: Status;
  hoverText?: string;
  popup?: PopupPreference;
};

type FunctionNode = {
  id: string;
  label: string;
  icon: string;
  description: string;

  xPercent: number;
  yPercent: number;

  popup: PopupPreference;
};

type CircleNode = {
  id: string;

  label: string[];

  description: string;

  accent: Accent;

  cx: number;
  cy: number;

  rx: number;
  ry: number;

  rotate: number;

  popup: PopupPreference;
};

type NotebookDecoration = {
  id: string;

  type: DecorationType;

  text?: string;

  xPercent: number;
  yPercent: number;

  rotate?: number;

  accent?: Accent;

  fontSize?: number;
};

type Milestone = {
  id: string;

  date: string;
  semester: string;

  title: string;
  note: string;

  status: Status;

  hoverText: string;

  popup: PopupPreference;
};

type AIWorkforceDiagram = {
  type: "ai-workforce";

  viewBox: {
    width: number;
    height: number;
  };

  idea: {
    label: string;

    x: number;
    y: number;
  };

  founder: {
    label: string[];

    x: number;
    y: number;

    rx: number;
    ry: number;

    description: string;

    popup: PopupPreference;
  };

  ai: {
    label: string;

    x: number;
    y: number;

    width: number;
    height: number;

    description: string;

    popup: PopupPreference;
  };

  functions: FunctionNode[];

  outcome: {
    label: string;

    x: number;
    y: number;

    rx: number;
    ry: number;

    description: string;

    popup: PopupPreference;
  };
};

type EconomicDevelopmentDiagram = {
  type: "economic-development";

  viewBox: {
    width: number;
    height: number;
  };

  exploration: {
    title: string;
    items: string[];
  };

  boundary: {
    label: string[];

    cx: number;
    cy: number;

    rx: number;
    ry: number;

    rotate: number;
  };

  nodes: CircleNode[];

  overlap: {
    cx: number;
    cy: number;

    rx: number;
    ry: number;

    path: string;

    description: string;

    popup: PopupPreference;
  };

  overlapAnnotation: {
    lines: string[];

    x: number;
    y: number;

    lineStartX: number;
    lineStartY: number;
  };
};

type DiagramConfig =
  | AIWorkforceDiagram
  | EconomicDevelopmentDiagram;

type Project = {
  id: string;

  statusLabel: string;

  title: string;

  question: string;

  annotation: string;

  annotationArrow?: string;

  footerNote: string;

  tape: Accent;

  diagram: DiagramConfig;

  stages: Stage[];

  decorations?: NotebookDecoration[];
};

/* ==========================================================================
   SECTION CONTENT
   ========================================================================== */

const sectionContent = {
  eyebrow:
    "From the Notebook",

  title:
    "Research in motion.",

  description:
    "Not just finished papers — the questions, fragments, and evolving ideas behind the work.",

  handwrittenNote:
    "This is where the work begins.",

  link: {
    href:
      "/research",

    label:
      "View all research →",
  },
};

/* ==========================================================================
   VISUAL CONFIGURATION

   Global visual tuning belongs here.
   ========================================================================== */

const visualConfig = {
page: {
  minHeight:
    650,

  gridSize:
    22,

  // Strong enough to read as hand-drawn,
  // but not so strong that curves become messy.
  sketchIntensity:
    4.4,

  secondaryStrokeOpacity:
    0.34,

  tertiaryStrokeOpacity:
    0.18,
},

  popup: {
    width:
      250,

    estimatedHeight:
      132,

    gap:
      14,

    viewportMargin:
      14,
  },

  aiWorkforce: {
    svgHeight:
      365,

    iconScale:
      1.24,

    branchStroke:
      1.55,

    duplicateStrokeOpacity:
      0.24,
  },

  economicDevelopment: {
    svgHeight:
      385,

    boundaryStroke:
      1.85,

    nodeStroke:
      1.6,

    hoverScale:
      1.035,

    hoverLift:
      -3,

    hoverStrokeIncrease:
      0.8,

    hoverFillOpacity:
      0.075,
  },

  stageTracker: {
    dotSize:
      16,

    lineWidth:
      1.1,
  },

  timeline: {
    dotSize:
      17,

    lineWidth:
      1.15,

    dateFontSize:
      10,

    semesterFontSize:
      10,

    titleFontSize:
      11,

    noteFontSize:
      10,

    lineHeight:
      1.45,
  },
};

/* ==========================================================================
   COLORS / TYPOGRAPHY
   ========================================================================== */

const palette = {
  ink:
    "#171717",

  pencil:
    "#303030",

  paper:
    "#f6f1e6",

  pageBackground:
    "#f8f5ed",

  blue:
    "#24519a",

  blueDark:
    "#173f7c",

  red:
    "#b64b43",

  green:
    "#60865f",

  gold:
    "#d39a2d",

  sticky:
    "#d9e4e4",

  complete:
    "#edf4e8",

  current:
    "#315ca8",

  future:
    "#f7f2e8",
};

const handwritingFont =
  "'Segoe Print','Bradley Hand','Comic Sans MS',cursive";

const accentStroke: Record<
  Accent,
  string
> = {
  neutral:
    "#202020",

  blue:
    palette.blue,

  green:
    palette.green,

  red:
    palette.red,

  gold:
    palette.gold,
};

const accentWash: Record<
  Accent,
  string
> = {
  neutral:
    "rgba(30,30,30,.045)",

  blue:
    "rgba(36,81,154,.065)",

  green:
    "rgba(96,134,95,.07)",

  red:
    "rgba(182,75,67,.065)",

  gold:
    "rgba(211,154,45,.075)",
};

const tapeColor: Record<
  Accent,
  string
> = {
  neutral:
    "#c9c2b6",

  blue:
    "#a9bddc",

  green:
    "#abc1a6",

  red:
    "#d6aaa5",

  gold:
    "#dec791",
};

const paperStyle: CSSProperties = {
  backgroundColor:
    palette.paper,

  backgroundImage: `
    radial-gradient(
      circle at 18% 24%,
      rgba(55,45,35,.025) 0 1px,
      transparent 1.4px
    ),
    radial-gradient(
      circle at 72% 61%,
      rgba(55,45,35,.018) 0 1px,
      transparent 1.3px
    ),
    linear-gradient(
      rgba(55,75,100,.040) 1px,
      transparent 1px
    ),
    linear-gradient(
      90deg,
      rgba(55,75,100,.040) 1px,
      transparent 1px
    )
  `,

  backgroundSize: `
    37px 41px,
    53px 47px,
    ${visualConfig.page.gridSize}px ${visualConfig.page.gridSize}px,
    ${visualConfig.page.gridSize}px ${visualConfig.page.gridSize}px
  `,
};

/* ==========================================================================
   PROJECT DATA
   ========================================================================== */

const projects: Project[] = [
  {
    id:
      "01",

    statusLabel:
      "Work in Progress",

    title:
      "AI-Native Solo Ventures",

    question:
      "What happens to the startup workforce when one founder can orchestrate AI as a virtual team?",

    annotation:
      "Can AI become part of the workforce?",

    annotationArrow:
      "↙",

    footerNote:
      "Building the conceptual foundation.",

    tape:
      "gold",

    decorations: [
      {
        id:
          "page-1-spark",

        type:
          "spark",

        xPercent:
          92,

        yPercent:
          59,

        rotate:
          7,

        accent:
          "gold",
      },

      {
        id:
          "page-1-pencil-mark",

        type:
          "underline",

        xPercent:
          68,

        yPercent:
          26,

        rotate:
          -3,

        accent:
          "blue",
      },
    ],

    diagram: {
      type:
        "ai-workforce",

      viewBox: {
        width:
          620,

        height:
          365,
      },

      idea: {
        label:
          "IDEA",

        x:
          300,

        y:
          36,
      },

      founder: {
        label: [
          "Solo",
          "Founder",
        ],

        x:
          300,

        y:
          103,

        rx:
          59,

        ry:
          37,

        description:
          "The solo founder remains the central decision-maker while AI expands the range of work one person can coordinate.",

        popup:
          "right",
      },

      ai: {
        label:
          "AI",

        x:
          235,

        y:
          162,

        width:
          130,

        height:
          52,

        description:
          "AI acts as a capability layer across functions that traditionally require several specialized contributors.",

        popup:
          "right",
      },

      functions: [
        {
          id:
            "research",

          label:
            "RESEARCH",

          icon:
            "⌕",

          description:
            "Searching, synthesis, opportunity discovery, and research support.",

          xPercent:
            11,

          yPercent:
            79,

          popup:
            "right",
        },

        {
          id:
            "content",

          label:
            "CONTENT",

          icon:
            "✎",

          description:
            "Communication, content development, branding, and visibility.",

          xPercent:
            29,

          yPercent:
            79,

          popup:
            "top",
        },

        {
          id:
            "operations",

          label:
            "OPERATIONS",

          icon:
            "⚙",

          description:
            "Repeatable operational work and workflow coordination.",

          xPercent:
            47,

          yPercent:
            79,

          popup:
            "top",
        },

        {
          id:
            "decisions",

          label:
            "DECISIONS",

          icon:
            "⌁",

          description:
            "Analysis and decision support that complements founder judgment.",

          xPercent:
            65,

          yPercent:
            79,

          popup:
            "top",
        },

        {
          id:
            "customers",

          label:
            "CUSTOMERS",

          icon:
            "♧",

          description:
            "Customer discovery, engagement, communication, and service.",

          xPercent:
            82,

          yPercent:
            79,

          popup:
            "left",
        },
      ],

      outcome: {
        label:
          "SCALE?",

        x:
          574,

        y:
          289,

        rx:
          41,

        ry:
          24,

        description:
          "Can AI-enabled capability help a solo founder expand venture activity without increasing human headcount at the same rate?",

        popup:
          "left",
      },
    },

    stages: [
      {
        id:
          "literature",

        label:
          "Literature Review",

        status:
          "complete",

        hoverText:
          "The initial literature foundation has been established.",

        popup:
          "right",
      },

      {
        id:
          "concept",

        label:
          "Concept Development",

        status:
          "current",

        hoverText:
          "Current emphasis: refining and strengthening the conceptual foundation.",

        popup:
          "top",
      },

      {
        id:
          "interviews",

        label:
          "Interviews",

        status:
          "future",

        hoverText:
          "Planned qualitative work will examine the phenomenon empirically.",

        popup:
          "top",
      },

      {
        id:
          "framework",

        label:
          "Framework",

        status:
          "future",

        hoverText:
          "Findings will inform development and refinement of the conceptual framework.",

        popup:
          "left",
      },
    ],
  },

  {
    id:
      "02",

    statusLabel:
      "Research Direction",

    title:
      "AI & Solo Business",

    question:
      "Can accessible AI help resource-constrained solo businesses grow without requiring sophisticated technical capabilities?",

    annotation:
      "Where technology, resourcefulness, and opportunity meet.",

    annotationArrow:
      "↙",

    footerNote:
      "Shaping the research direction.",

    tape:
      "blue",

    decorations: [
      {
        id:
          "page-2-asterisk",

        type:
          "asterisk",

        xPercent:
          94,

        yPercent:
          35,

        rotate:
          7,

        accent:
          "neutral",

        fontSize:
          22,
      },

      {
        id:
          "page-2-note",

        type:
          "note",

        text:
          "impact →",

        xPercent:
          89,

        yPercent:
          48,

        rotate:
          -4,

        accent:
          "blue",

        fontSize:
          10,
      },
    ],

    diagram: {
      type:
        "economic-development",

      viewBox: {
        width:
          650,

        height:
          385,
      },

      exploration: {
        title:
          "AREAS I'M EXPLORING",

        items: [
          "AI for productivity",
          "Marketing & visibility",
          "Customer engagement",
          "Decision support",
          "Financial planning",
          "Learning & skills",
        ],
      },

      /*
       * Enlarged from the previous version.
       *
       * The center moves only slightly upward while the radii increase.
       * This keeps the composition large without letting it collide
       * with the stage tracker below.
       */
      boundary: {
        label: [
          "UPLIFTING ECONOMIES",
          "ECONOMIC DEVELOPMENT",
        ],

        cx:
          414,

        cy:
          200,

        rx:
          205,

        ry:
          154,

        rotate:
          -1.4,
      },

      nodes: [
        {
          id:
            "founder",

          label: [
            "Solo",
            "Founder",
          ],

          description:
            "The entrepreneur remains at the center of coordinating the venture and its resources.",

          accent:
            "neutral",

          cx:
            345,

          cy:
            211,

          rx:
            69,

          ry:
            54,

          rotate:
            -4,

          popup:
            "left",
        },

        {
          id:
            "genai",

          label: [
            "Publicly",
            "Accessible",
            "GenAI Tools",
          ],

          description:
            "Powerful generative AI capabilities become broadly accessible without requiring sophisticated technical infrastructure.",

          accent:
            "green",

          cx:
            414,

          cy:
            150,

          rx:
            61,

          ry:
            63,

          rotate:
            2,

          popup:
            "top",
        },

        {
          id:
            "growth",

          label: [
            "Going 0→1",
            "& Growth",
          ],

          description:
            "Turning an idea into something real, then building toward sustainable growth.",

          accent:
            "red",

          cx:
            480,

          cy:
            211,

          rx:
            71,

          ry:
            55,

          rotate:
            4,

          popup:
            "right",
        },

        {
          id:
            "frugal",

          label: [
            "Frugal",
            "Innovation",
          ],

          description:
            "Creating meaningful value despite constraints in capital, labor, infrastructure, or specialized expertise.",

          accent:
            "gold",

          cx:
            414,

          cy:
            267,

          rx:
            62,

          ry:
            59,

          rotate:
            -3,

          popup:
            "bottom",
        },
      ],

      overlap: {
        cx:
          414,

        cy:
          211,

        rx:
          22,

        ry:
          22,

        path:
          "M396 203 C401 192 412 188 423 193 C435 198 439 209 435 220 C430 232 419 236 408 233 C396 229 392 215 396 203 Z",

        description:
          "The intersection is the research sweet spot: entrepreneurial agency, publicly accessible AI, frugal resourcefulness, venture creation, and economic opportunity converge.",

        popup:
          "right",
      },

      overlapAnnotation: {
        lines: [
          "The overlap",
          "matters.",
        ],

        x:
          594,

        y:
          219,

        lineStartX:
          437,

        lineStartY:
          215,
      },
    },

    stages: [
      {
        id:
          "idea",

        label:
          "Idea Development",

        status:
          "current",

        hoverText:
          "Current emphasis: defining the boundaries and central research question.",

        popup:
          "right",
      },

      {
        id:
          "exploration",

        label:
          "Early Exploration",

        status:
          "future",

        hoverText:
          "The next phase will explore relationships among accessible AI, resource constraints, and solo entrepreneurship.",

        popup:
          "top",
      },

      {
        id:
          "refine",

        label:
          "Refine Question",

        status:
          "future",

        hoverText:
          "Evidence from early exploration will be used to sharpen the research question.",

        popup:
          "left",
      },
    ],
  },
];

/* ==========================================================================
   JOURNEY DATA
   ========================================================================== */

const researchJourney = {
  title:
    "Research Journey — Key Milestones",

  disclaimer:
    "* Timelines are estimates and will evolve with the research.",

  milestones: [
    {
      id:
        "fall-2023",

      date:
        "AUG 2023",

      semester:
        "Fall 2023",

      title:
        "Initial curiosity & problem awareness",

      note:
        "Direction begins",

      status:
        "complete",

      hoverText:
        "Early exploration begins around AI, entrepreneurship, and changes in how ventures can be built.",

      popup:
        "right",
    },

    {
      id:
        "spring-2024",

      date:
        "JAN 2024",

      semester:
        "Spring 2024",

      title:
        "Literature scan & problem identification",

      note:
        "Baseline built",

      status:
        "complete",

      hoverText:
        "Initial literature exploration establishes the theoretical baseline and identifies important gaps.",

      popup:
        "right",
    },

    {
      id:
        "fall-2024",

      date:
        "AUG 2024",

      semester:
        "Fall 2024",

      title:
        "Deep dive into core literature",

      note:
        "Insights emerging",

      status:
        "complete",

      hoverText:
        "Deeper engagement with the literature makes the emerging research direction more focused.",

      popup:
        "top",
    },

    {
      id:
        "spring-2025",

      date:
        "JAN 2025",

      semester:
        "Spring 2025",

      title:
        "Concept framing & initial framework",

      note:
        "Framework evolving",

      status:
        "complete",

      hoverText:
        "Emerging concepts begin connecting into an initial conceptual explanation.",

      popup:
        "top",
    },

    {
      id:
        "fall-2025",

      date:
        "AUG 2025",

      semester:
        "Fall 2025",

      title:
        "Evidence development",

      note:
        "Direction refined",

      status:
        "complete",

      hoverText:
        "Continued research sharpens the boundaries of the phenomenon.",

      popup:
        "top",
    },

    {
      id:
        "spring-2026",

      date:
        "JAN 2026",

      semester:
        "Spring 2026",

      title:
        "Analysis & theory development",

      note:
        "Patterns taking shape",

      status:
        "complete",

      hoverText:
        "Patterns across the literature and conceptual work begin informing theory development.",

      popup:
        "top",
    },

    {
      id:
        "fall-2026",

      date:
        "AUG 2026",

      semester:
        "Fall 2026",

      title:
        "Current research development",

      note:
        "You are here",

      status:
        "current",

      hoverText:
        "Current work focuses on systematic literature development, conceptual refinement, and defining the empirical phase.",

      popup:
        "left",
    },

    {
      id:
        "spring-2027",

      date:
        "JAN 2027",

      semester:
        "Spring 2027",

      title:
        "Experimental study",

      note:
        "Empirical testing",

      status:
        "future",

      hoverText:
        "Planned experimental work tests ideas developed through the earlier research phases.",

      popup:
        "left",
    },
  ] satisfies Milestone[],
};

/* ==========================================================================
   VIEWPORT-SAFE TOOLTIP
   ========================================================================== */

type TooltipState = {
  visible: boolean;

  left: number;
  top: number;

  content: ReactNode;
};

function calculateTooltipPosition(
  rect: DOMRect,
  preference: PopupPreference,
) {
  const {
    width,
    estimatedHeight,
    gap,
    viewportMargin,
  } =
    visualConfig.popup;

  const viewportWidth =
    window.innerWidth;

  const viewportHeight =
    window.innerHeight;

  let left =
    rect.left +
    rect.width / 2 -
    width / 2;

  let top =
    rect.top -
    estimatedHeight -
    gap;

  if (
    preference ===
    "right"
  ) {
    left =
      rect.right +
      gap;

    top =
      rect.top +
      rect.height / 2 -
      estimatedHeight / 2;
  }

  if (
    preference ===
    "left"
  ) {
    left =
      rect.left -
      width -
      gap;

    top =
      rect.top +
      rect.height / 2 -
      estimatedHeight / 2;
  }

  if (
    preference ===
    "bottom"
  ) {
    left =
      rect.left +
      rect.width / 2 -
      width / 2;

    top =
      rect.bottom +
      gap;
  }

  left =
    Math.max(
      viewportMargin,
      Math.min(
        left,
        viewportWidth -
          width -
          viewportMargin,
      ),
    );

  top =
    Math.max(
      viewportMargin,
      Math.min(
        top,
        viewportHeight -
          estimatedHeight -
          viewportMargin,
      ),
    );

  return {
    left,
    top,
  };
}

function HoverTarget({
  children,
  content,
  preference = "top",
  className = "",
  style,
  onActiveChange,
}: {
  children?: ReactNode;

  content: ReactNode;

  preference?: PopupPreference;

  className?: string;

  style?: CSSProperties;

  onActiveChange?: (
    active: boolean,
  ) => void;
}) {
  const [
    tooltip,
    setTooltip,
  ] =
    useState<TooltipState>({
      visible:
        false,

      left:
        0,

      top:
        0,

      content:
        null,
    });

  const showTooltip = (
    element: HTMLElement,
  ) => {
    const rect =
      element.getBoundingClientRect();

    const position =
      calculateTooltipPosition(
        rect,
        preference,
      );

    setTooltip({
      visible:
        true,

      left:
        position.left,

      top:
        position.top,

      content,
    });

    onActiveChange?.(
      true,
    );
  };

  const hideTooltip =
    () => {
      setTooltip(
        (current) => ({
          ...current,

          visible:
            false,
        }),
      );

      onActiveChange?.(
        false,
      );
    };

  return (
    <>
      <div
        className={
          className
        }
        style={style}
        onMouseEnter={(
          event,
        ) =>
          showTooltip(
            event.currentTarget,
          )
        }
        onMouseLeave={
          hideTooltip
        }
        onFocus={(
          event,
        ) =>
          showTooltip(
            event.currentTarget,
          )
        }
        onBlur={
          hideTooltip
        }
      >
        {children}
      </div>

      {tooltip.visible &&
        typeof document !==
          "undefined" &&
        createPortal(
          <div
            className="pointer-events-none fixed z-[99999] border border-black/20 bg-[#fffaf0] px-4 py-3 text-left text-[12px] leading-relaxed shadow-[3px_4px_14px_rgba(0,0,0,.16)]"
            style={{
              left:
                tooltip.left,

              top:
                tooltip.top,

              width:
                visualConfig
                  .popup
                  .width,

              maxWidth:
                `calc(100vw - ${
                  visualConfig
                    .popup
                    .viewportMargin *
                  2
                }px)`,

              fontFamily:
                handwritingFont,

              transform:
                "rotate(-0.6deg)",
            }}
          >
            {
              tooltip.content
            }
          </div>,

          document.body,
        )}
    </>
  );
}

/* ==========================================================================
   SVG SKETCH SYSTEM
   ========================================================================== */

function SketchDefinitions() {
  return (
    <defs>
      <filter
        id="rough-pencil"
        x="-25%"
        y="-25%"
        width="150%"
        height="150%"
      >
        <feTurbulence
  type="fractalNoise"
  baseFrequency="0.026 0.018"
  numOctaves="4"
  seed="17"
  result="noise"
/>

        <feDisplacementMap
          in="SourceGraphic"
          in2="noise"
          scale={
            visualConfig
              .page
              .sketchIntensity
          }
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>

      <filter
        id="rough-pencil-light"
        x="-20%"
        y="-20%"
        width="140%"
        height="140%"
      >
        <feTurbulence
  type="fractalNoise"
  baseFrequency="0.031 0.021"
  numOctaves="3"
  seed="29"
  result="noise"
/>

<feDisplacementMap
  in="SourceGraphic"
  in2="noise"
  scale="2.35"
  xChannelSelector="R"
  yChannelSelector="G"
/>
      </filter>

      <marker
        id="sketch-arrow"
        viewBox="0 0 10 10"
        refX="8"
        refY="5"
        markerWidth="6.5"
        markerHeight="6.5"
        orient="auto-start-reverse"
      >
        <path
          d="
            M 0 1
            L 8 5
            L 0 9
          "
          fill="none"
          stroke={
            palette.ink
          }
          strokeWidth="1.25"
          opacity=".88"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </marker>
    </defs>
  );
}

function SvgMultilineText({
  lines,
  x,
  y,
  fontSize = 14,
  fill = palette.ink,
  weight = 500,
}: {
  lines: string[];

  x: number;
  y: number;

  fontSize?: number;

  fill?: string;

  weight?: number;
}) {
  const lineHeight =
    fontSize * 1.14;

  const startY =
    y -
    ((lines.length -
      1) *
      lineHeight) /
      2;

  return (
    <text
      x={x}
      y={startY}
      textAnchor="middle"
      dominantBaseline="middle"
      fill={fill}
      fontSize={
        fontSize
      }
      fontWeight={
        weight
      }
      style={{
        fontFamily:
          handwritingFont,
      }}
    >
      {lines.map(
        (
          line,
          index,
        ) => (
          <tspan
            key={`${line}-${index}`}
            x={x}
            dy={
              index ===
              0
                ? 0
                : lineHeight
            }
          >
            {line}
          </tspan>
        ),
      )}
    </text>
  );
}

/* ==========================================================================
   PAPER DETAILS
   ========================================================================== */

function Tape({
  accent,
}: {
  accent: Accent;
}) {
  return (
    <span
      aria-hidden="true"
      className="absolute -top-4 right-9 h-11 w-28 rotate-[13deg] opacity-65"
      style={{
        backgroundColor:
          tapeColor[
            accent
          ],

        clipPath:
          "polygon(2% 6%, 98% 1%, 96% 94%, 5% 100%, 0% 82%)",
      }}
    />
  );
}

function PunchHoles() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-4 left-2 top-4 flex flex-col justify-between"
    >
      {Array.from({
        length:
          13,
      }).map(
        (
          _,
          index,
        ) => (
          <span
            key={
              index
            }
            className="h-[13px] w-[13px] rounded-full border border-black/15 bg-[#dedbd1] shadow-inner"
          />
        ),
      )}
    </div>
  );
}

/* ==========================================================================
   CONFIG-DRIVEN NOTEBOOK DECORATIONS
   ========================================================================== */

function NotebookDecorations({
  decorations = [],
}: {
  decorations?: NotebookDecoration[];
}) {
  return (
    <>
      {decorations.map(
        (
          decoration,
        ) => {
          const color =
            accentStroke[
              decoration.accent ??
                "neutral"
            ];

          const commonStyle: CSSProperties =
            {
              position:
                "absolute",

              left: `${decoration.xPercent}%`,

              top: `${decoration.yPercent}%`,

              transform: `translate(-50%, -50%) rotate(${decoration.rotate ?? 0}deg)`,

              color,

              fontFamily:
                handwritingFont,

              pointerEvents:
                "none",

              zIndex:
                5,
            };

          if (
            decoration.type ===
            "note"
          ) {
            return (
              <span
                key={
                  decoration.id
                }
                style={{
                  ...commonStyle,

                  fontSize:
                    decoration.fontSize ??
                    10,

                  fontStyle:
                    "italic",

                  opacity:
                    0.78,
                }}
              >
                {
                  decoration.text
                }
              </span>
            );
          }

          if (
            decoration.type ===
            "asterisk"
          ) {
            return (
              <span
                key={
                  decoration.id
                }
                style={{
                  ...commonStyle,

                  fontSize:
                    decoration.fontSize ??
                    21,

                  lineHeight:
                    1,
                }}
              >
                *
              </span>
            );
          }

          if (
            decoration.type ===
            "spark"
          ) {
            return (
              <span
                key={
                  decoration.id
                }
                style={{
                  ...commonStyle,

                  fontSize:
                    19,

                  opacity:
                    0.7,
                }}
              >
                ✦
              </span>
            );
          }

          if (
            decoration.type ===
            "arrow"
          ) {
            return (
              <span
                key={
                  decoration.id
                }
                style={{
                  ...commonStyle,

                  fontSize:
                    20,
                }}
              >
                ↘
              </span>
            );
          }

          return (
            <span
              key={
                decoration.id
              }
              style={{
                ...commonStyle,

                width:
                  54,

                height:
                  8,

                borderBottom: `1.4px solid ${color}`,

                borderRadius:
                  "50%",

                opacity:
                  0.52,
              }}
            />
          );
        },
      )}
    </>
  );
}

/* ==========================================================================
   PAGE 01 FUNCTION NODES
   ========================================================================== */

function InteractiveFunction({
  node,
}: {
  node: FunctionNode;
}) {
  return (
    <HoverTarget
      content={
        node.description
      }
      preference={
        node.popup
      }
      className="absolute z-40 -translate-x-1/2 -translate-y-1/2 cursor-help"
      style={{
        left: `${node.xPercent}%`,

        top: `${node.yPercent}%`,
      }}
    >
      <div className="group flex min-w-[76px] flex-col items-center transition duration-200 ease-out hover:-translate-y-[5px] hover:rotate-[-2deg]">
        <span
          className="leading-none transition-transform duration-200 group-hover:scale-110"
          style={{
            fontSize: `${visualConfig.aiWorkforce.iconScale * 1.5}rem`,

            fontFamily:
              handwritingFont,
          }}
        >
          {node.icon}
        </span>

        <span
          className="mt-2 whitespace-nowrap text-[10px] font-semibold transition-transform duration-200 group-hover:scale-[1.03]"
          style={{
            fontFamily:
              handwritingFont,
          }}
        >
          {node.label}
        </span>
      </div>
    </HoverTarget>
  );
}

/* ==========================================================================
   PAGE 01 AI WORKFORCE
   ========================================================================== */

function AIWorkforceDiagram({
  diagram,
}: {
  diagram: AIWorkforceDiagram;
}) {
  const {
    width,
    height,
  } =
    diagram.viewBox;

  const aiCenterX =
    diagram.ai.x +
    diagram.ai.width /
      2;

  const aiBottom =
    diagram.ai.y +
    diagram.ai.height;

  const customer =
    diagram.functions[
      diagram.functions
        .length - 1
    ];

  const customerX =
    (customer.xPercent /
      100) *
    width;

  const customerY =
    (customer.yPercent /
      100) *
    height;

  return (
    <div
      className="relative mx-auto w-full max-w-[620px]"
      style={{
        height:
          visualConfig
            .aiWorkforce
            .svgHeight,
      }}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="absolute inset-0 h-full w-full overflow-visible"
      >
        <SketchDefinitions />

        {/* IDEA */}

        <g
          filter="url(#rough-pencil)"
          transform={`translate(${diagram.idea.x}, ${diagram.idea.y})`}
        >
          <path
            d="
              M 0 -10
              L 10 0
              L 0 10
              L -10 0
              Z
            "
            fill="none"
            stroke={
              palette.ink
            }
            strokeWidth="1.8"
          />

          <path
            d="
              M 1 -9
              L 9 1
              L -1 11
              L -9 -1
            "
            fill="none"
            stroke={
              palette.ink
            }
            strokeWidth=".65"
            opacity={
              visualConfig
                .page
                .secondaryStrokeOpacity
            }
          />
        </g>

        <text
          x={
            diagram.idea.x +
            20
          }
          y={
            diagram.idea.y +
            4
          }
          fontSize="13"
          fill={
            palette.ink
          }
          style={{
            fontFamily:
              handwritingFont,
          }}
        >
          {
            diagram.idea
              .label
          }
        </text>

        {/* IDEA TO FOUNDER */}

        <path
          d={`
            M ${diagram.idea.x} ${diagram.idea.y + 13}

            C ${diagram.idea.x - 2} ${diagram.idea.y + 27},

            ${diagram.founder.x + 2}
            ${diagram.founder.y - diagram.founder.ry - 12},

            ${diagram.founder.x}
            ${diagram.founder.y - diagram.founder.ry - 3}
          `}
          fill="none"
          stroke={
            palette.ink
          }
          strokeWidth="1.4"
          markerEnd="url(#sketch-arrow)"
          filter="url(#rough-pencil)"
        />

        {/* FOUNDER */}

        <ellipse
          cx={
            diagram.founder.x
          }
          cy={
            diagram.founder.y
          }
          rx={
            diagram.founder.rx
          }
          ry={
            diagram.founder.ry
          }
          fill="rgba(255,255,255,.10)"
          stroke={
            palette.red
          }
          strokeWidth="1.8"
          transform={`rotate(-3 ${diagram.founder.x} ${diagram.founder.y})`}
          filter="url(#rough-pencil)"
        />

        <ellipse
          cx={
            diagram.founder.x +
            1
          }
          cy={
            diagram.founder.y -
            1
          }
          rx={
            diagram.founder.rx -
            1
          }
          ry={
            diagram.founder.ry +
            1
          }
          fill="none"
          stroke={
            palette.red
          }
          strokeWidth=".6"
          opacity=".27"
        />

        <ellipse
  cx={
    diagram.founder.x -
    1.5
  }
  cy={
    diagram.founder.y +
    1.2
  }
  rx={
    diagram.founder.rx +
    1.2
  }
  ry={
    diagram.founder.ry -
    1
  }
  fill="none"
  stroke={
    palette.red
  }
  strokeWidth=".5"
  opacity=".17"
  transform={`rotate(-1.2 ${diagram.founder.x} ${diagram.founder.y})`}
  filter="url(#rough-pencil-light)"
/>

        <SvgMultilineText
          lines={
            diagram.founder
              .label
          }
          x={
            diagram.founder.x
          }
          y={
            diagram.founder.y
          }
          fontSize={15}
        />

        {/* FOUNDER TO AI */}

        <path
          d={`
            M ${diagram.founder.x}
            ${diagram.founder.y + diagram.founder.ry + 3}

            C ${diagram.founder.x - 2}
            ${diagram.founder.y + diagram.founder.ry + 18},

            ${aiCenterX + 2}
            ${diagram.ai.y - 14},

            ${aiCenterX}
            ${diagram.ai.y - 4}
          `}
          fill="none"
          stroke={
            palette.ink
          }
          strokeWidth="1.45"
          markerEnd="url(#sketch-arrow)"
          filter="url(#rough-pencil)"
        />

        {/* AI */}

        <path
          d={`
            M ${diagram.ai.x} ${diagram.ai.y + 2}

            L ${diagram.ai.x + diagram.ai.width - 2}
            ${diagram.ai.y}

            L ${diagram.ai.x + diagram.ai.width}
            ${diagram.ai.y + diagram.ai.height - 2}

            L ${diagram.ai.x + 2}
            ${diagram.ai.y + diagram.ai.height}

            Z
          `}
          fill="#e0e8d9"
          stroke="#5d6c58"
          strokeWidth="1.8"
          filter="url(#rough-pencil)"
        />

        <path
  d={`
    M ${diagram.ai.x + 2}
    ${diagram.ai.y - 1}

    L ${diagram.ai.x + diagram.ai.width + 1}
    ${diagram.ai.y + 2}

    L ${diagram.ai.x + diagram.ai.width - 2}
    ${diagram.ai.y + diagram.ai.height + 1}

    L ${diagram.ai.x - 1}
    ${diagram.ai.y + diagram.ai.height - 2}

    Z
  `}
  fill="none"
  stroke="#5d6c58"
  strokeWidth=".55"
  opacity=".26"
  filter="url(#rough-pencil-light)"
/>

        {/* pencil repeat */}

        <path
          d={`
            M ${diagram.ai.x + 3} ${diagram.ai.y + 1}

            L ${diagram.ai.x + diagram.ai.width - 1}
            ${diagram.ai.y + 3}

            L ${diagram.ai.x + diagram.ai.width - 3}
            ${diagram.ai.y + diagram.ai.height - 1}
          `}
          fill="none"
          stroke="#5d6c58"
          strokeWidth=".65"
          opacity=".27"
        />

        {/* light hatching */}

        {Array.from({
          length:
            6,
        }).map(
          (
            _,
            index,
          ) => (
            <path
              key={
                index
              }
              d={`
                M ${diagram.ai.x + 10 + index * 19}
                ${diagram.ai.y + diagram.ai.height - 5}

                L ${diagram.ai.x + 29 + index * 19}
                ${diagram.ai.y + 5}
              `}
              fill="none"
              stroke="#5d6c58"
              strokeWidth=".45"
              opacity=".10"
            />
          ),
        )}

        <text
          x={
            aiCenterX
          }
          y={
            diagram.ai.y +
            diagram.ai.height /
              2 +
            8
          }
          textAnchor="middle"
          fontSize="30"
          fontWeight="700"
          fill={
            palette.ink
          }
          style={{
            fontFamily:
              handwritingFont,
          }}
        >
          {
            diagram.ai.label
          }
        </text>

        {/* AI BRANCHES */}

        {diagram.functions.map(
          (
            node,
          ) => {
            const targetX =
              (node.xPercent /
                100) *
              width;

            const targetY =
              (node.yPercent /
                100) *
                height -
              29;

            const direction =
              targetX -
              aiCenterX;

            const startX =
              aiCenterX +
              direction *
                0.12;

            const control1X =
              aiCenterX +
              direction *
                0.22;

            const control2X =
              targetX -
              direction *
                0.08;

            return (
              <g
                key={
                  node.id
                }
              >
                <path
                  d={`
                    M ${startX}
                    ${aiBottom + 4}

                    C ${control1X}
                    ${aiBottom + 24},

                    ${control2X}
                    ${targetY - 22},

                    ${targetX}
                    ${targetY}
                  `}
                  fill="none"
                  stroke={
                    palette.ink
                  }
                  strokeWidth={
                    visualConfig
                      .aiWorkforce
                      .branchStroke
                  }
                  strokeLinecap="round"
                  markerEnd="url(#sketch-arrow)"
                  filter="url(#rough-pencil)"
                />

                <path
                  d={`
                    M ${startX + 1.5}
                    ${aiBottom + 5}

                    C ${control1X - 1}
                    ${aiBottom + 25},

                    ${control2X + 1}
                    ${targetY - 20},

                    ${targetX + 1}
                    ${targetY - 1}
                  `}
                  fill="none"
                  stroke={
                    palette.ink
                  }
                  strokeWidth=".65"
                  opacity={
                    visualConfig
                      .aiWorkforce
                      .duplicateStrokeOpacity
                  }
                />
              </g>
            );
          },
        )}

        {/* CUSTOMER TO SCALE */}

        <path
          d={`
            M ${customerX + 28}
            ${customerY - 4}

            C ${customerX + 47}
            ${customerY - 4},

            ${diagram.outcome.x - diagram.outcome.rx - 15}
            ${diagram.outcome.y},

            ${diagram.outcome.x - diagram.outcome.rx - 4}
            ${diagram.outcome.y}
          `}
          fill="none"
          stroke={
            palette.ink
          }
          strokeWidth="1.4"
          markerEnd="url(#sketch-arrow)"
          filter="url(#rough-pencil)"
        />

        {/* SCALE */}

        <ellipse
          cx={
            diagram.outcome.x
          }
          cy={
            diagram.outcome.y
          }
          rx={
            diagram.outcome.rx
          }
          ry={
            diagram.outcome.ry
          }
          fill="#fff8e8"
          stroke={
            palette.gold
          }
          strokeWidth="1.8"
          transform={`rotate(2 ${diagram.outcome.x} ${diagram.outcome.y})`}
          filter="url(#rough-pencil)"
        />

        <ellipse
          cx={
            diagram.outcome.x +
            1
          }
          cy={
            diagram.outcome.y -
            1
          }
          rx={
            diagram.outcome.rx -
            1
          }
          ry={
            diagram.outcome.ry +
            1
          }
          fill="none"
          stroke={
            palette.gold
          }
          strokeWidth=".65"
          opacity=".25"
        />

        <text
          x={
            diagram.outcome.x
          }
          y={
            diagram.outcome.y +
            6
          }
          textAnchor="middle"
          fill={
            palette.ink
          }
          fontSize="18"
          style={{
            fontFamily:
              handwritingFont,
          }}
        >
          {
            diagram.outcome
              .label
          }
        </text>
      </svg>

      {/* INTERACTIVE FOUNDER */}

      <HoverTarget
        content={
          diagram.founder
            .description
        }
        preference={
          diagram.founder
            .popup
        }
        className="absolute z-40 cursor-help rounded-full transition-transform duration-200 hover:-translate-y-[3px] hover:scale-[1.025]"
        style={{
          left: `${
            ((diagram.founder.x -
              diagram.founder.rx) /
              width) *
            100
          }%`,

          top: `${
            ((diagram.founder.y -
              diagram.founder.ry) /
              height) *
            100
          }%`,

          width: `${
            ((diagram.founder.rx *
              2) /
              width) *
            100
          }%`,

          height: `${
            ((diagram.founder.ry *
              2) /
              height) *
            100
          }%`,
        }}
      />

      {/* INTERACTIVE AI */}

      <HoverTarget
        content={
          diagram.ai
            .description
        }
        preference={
          diagram.ai.popup
        }
        className="absolute z-40 cursor-help transition-transform duration-200 hover:-translate-y-[3px] hover:scale-[1.025]"
        style={{
          left: `${
            (diagram.ai.x /
              width) *
            100
          }%`,

          top: `${
            (diagram.ai.y /
              height) *
            100
          }%`,

          width: `${
            (diagram.ai.width /
              width) *
            100
          }%`,

          height: `${
            (diagram.ai.height /
              height) *
            100
          }%`,
        }}
      />

      {diagram.functions.map(
        (
          node,
        ) => (
          <InteractiveFunction
            key={
              node.id
            }
            node={
              node
            }
          />
        ),
      )}

      {/* SCALE INTERACTION */}

      <HoverTarget
        content={
          diagram.outcome
            .description
        }
        preference={
          diagram.outcome
            .popup
        }
        className="absolute z-40 cursor-help rounded-full transition-transform duration-200 hover:-translate-y-[3px] hover:scale-[1.035]"
        style={{
          left: `${
            ((diagram.outcome.x -
              diagram.outcome.rx) /
              width) *
            100
          }%`,

          top: `${
            ((diagram.outcome.y -
              diagram.outcome.ry) /
              height) *
            100
          }%`,

          width: `${
            ((diagram.outcome.rx *
              2) /
              width) *
            100
          }%`,

          height: `${
            ((diagram.outcome.ry *
              2) /
              height) *
            100
          }%`,
        }}
      />
    </div>
  );
}

/* ==========================================================================
   PAGE 02 STICKY NOTE
   ========================================================================== */

function ExplorationNote({
  exploration,
}: {
  exploration:
    EconomicDevelopmentDiagram["exploration"];
}) {
  return (
    <div
      className="absolute left-1 top-[126px] z-30 w-[164px] px-4 py-5 shadow-[2px_5px_10px_rgba(0,0,0,.12)]"
      style={{
        backgroundColor:
          palette.sticky,

        fontFamily:
          handwritingFont,

        transform:
          "rotate(-2deg)",

        clipPath:
          "polygon(1% 3%, 98% 0%, 100% 93%, 90% 96%, 80% 92%, 67% 98%, 55% 94%, 43% 99%, 30% 95%, 15% 99%, 1% 96%)",
      }}
    >
      <p className="text-[11px] font-semibold">
        {
          exploration.title
        }
      </p>

      <div className="my-2 h-px w-full rotate-[-1deg] bg-black/45" />

      <ul className="space-y-[4px] text-[10px] leading-relaxed">
        {exploration.items.map(
          (
            item,
          ) => (
            <li
              key={
                item
              }
            >
              • {item}
            </li>
          ),
        )}
      </ul>
    </div>
  );
}

/* ==========================================================================
   INTERACTIVE VENN NODE
   ========================================================================== */

function InteractiveVennNode({
  node,
  width,
  height,
}: {
  node: CircleNode;

  width: number;
  height: number;
}) {
  const [
    active,
    setActive,
  ] =
    useState(false);

  const scale =
    active
      ? visualConfig
          .economicDevelopment
          .hoverScale
      : 1;

  const lift =
    active
      ? visualConfig
          .economicDevelopment
          .hoverLift
      : 0;

  const strokeWidth =
    visualConfig
      .economicDevelopment
      .nodeStroke +
    (active
      ? visualConfig
          .economicDevelopment
          .hoverStrokeIncrease
      : 0);

  return (
    <>
      <g
        style={{
          transformBox:
            "fill-box",

          transformOrigin:
            "center",

          transform: `translateY(${lift}px) scale(${scale})`,

          transition:
            "transform 180ms ease, opacity 180ms ease",
        }}
      >
        <ellipse
          cx={
            node.cx
          }
          cy={
            node.cy
          }
          rx={
            node.rx
          }
          ry={
            node.ry
          }
          transform={`rotate(${node.rotate} ${node.cx} ${node.cy})`}
          fill={
            active
              ? accentWash[
                  node.accent
                ]
              : "rgba(255,255,255,.035)"
          }
          stroke={
            accentStroke[
              node.accent
            ]
          }
          strokeWidth={
            strokeWidth
          }
          filter="url(#rough-pencil)"
          style={{
            transition:
              "fill 180ms ease, stroke-width 180ms ease",
          }}
        />

        {/* SECOND IMPERFECT PASS */}

        <ellipse
cx={
  node.cx +
  1.8
}
cy={
  node.cy -
  1.4
}
rx={
  node.rx -
  1.5
}
ry={
  node.ry +
  1.8
}
transform={`rotate(${node.rotate + 1.7} ${node.cx} ${node.cy})`}
          fill="none"
          stroke={
            accentStroke[
              node.accent
            ]
          }
          strokeWidth={
            active
              ? 0.85
              : 0.55
          }
          opacity={
            active
              ? 0.32
              : visualConfig
                  .page
                  .secondaryStrokeOpacity
          }
        />

        {/* THIRD PENCIL PASS */}

        <ellipse
          cx={
  node.cx -
  1.6
}
cy={
  node.cy +
  1.3
}
rx={
  node.rx +
  1.3
}
ry={
  node.ry -
  1.5
}
transform={`rotate(${node.rotate - 1.5} ${node.cx} ${node.cy})`}
          fill="none"
          stroke={
            accentStroke[
              node.accent
            ]
          }
          strokeWidth=".5"
          opacity={
            active
              ? 0.25
              : visualConfig
                  .page
                  .tertiaryStrokeOpacity
          }
        />

        <SvgMultilineText
          lines={
            node.label
          }
          x={
            node.cx
          }
          y={
            node.cy
          }
          fontSize={
            active
              ? 13.6
              : 13
          }
          weight={
            active
              ? 650
              : 500
          }
        />
      </g>

      <foreignObject
        x={
          node.cx -
          node.rx
        }
        y={
          node.cy -
          node.ry
        }
        width={
          node.rx * 2
        }
        height={
          node.ry * 2
        }
        style={{
          overflow:
            "visible",
        }}
      >
        <HoverTarget
          content={
            node.description
          }
          preference={
            node.popup
          }
          onActiveChange={
            setActive
          }
          className="h-full w-full cursor-help rounded-full"
        />
      </foreignObject>
    </>
  );
}

/* ==========================================================================
   PAGE 02 ECONOMIC DEVELOPMENT
   ========================================================================== */

function EconomicDevelopmentDiagramView({
  diagram,
}: {
  diagram:
    EconomicDevelopmentDiagram;
}) {
  const {
    width,
    height,
  } =
    diagram.viewBox;

  const [
    overlapActive,
    setOverlapActive,
  ] =
    useState(false);

  return (
    <div
      className="relative mx-auto w-full max-w-[650px]"
      style={{
        height:
          visualConfig
            .economicDevelopment
            .svgHeight,
      }}
    >
      <ExplorationNote
        exploration={
          diagram.exploration
        }
      />

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="absolute inset-0 h-full w-full overflow-visible"
      >
        <SketchDefinitions />

        {/* OUTER BOUNDARY */}

        <ellipse
          cx={
            diagram.boundary.cx
          }
          cy={
            diagram.boundary.cy
          }
          rx={
            diagram.boundary.rx
          }
          ry={
            diagram.boundary.ry
          }
          transform={`rotate(${diagram.boundary.rotate} ${diagram.boundary.cx} ${diagram.boundary.cy})`}
          fill="none"
          stroke={
            palette.blue
          }
          strokeWidth={
            visualConfig
              .economicDevelopment
              .boundaryStroke
          }
          filter="url(#rough-pencil)"
        />

        {/* SECOND BOUNDARY PASS */}

        <ellipse
  cx={
    diagram.boundary.cx +
    2
  }
  cy={
    diagram.boundary.cy -
    1.5
  }
  rx={
    diagram.boundary.rx -
    1.8
  }
  ry={
    diagram.boundary.ry +
    2
  }
  transform={`rotate(${diagram.boundary.rotate - 1.4} ${diagram.boundary.cx} ${diagram.boundary.cy})`}
  fill="none"
  stroke={
    palette.blue
  }
  strokeWidth=".72"
  opacity=".32"
/>
       

        {/* THIRD FAINT PASS */}

        <ellipse
  cx={
    diagram.boundary.cx -
    1.7
  }
  cy={
    diagram.boundary.cy +
    1.6
  }
  rx={
    diagram.boundary.rx +
    1.5
  }
  ry={
    diagram.boundary.ry -
    1.7
  }
  transform={`rotate(${diagram.boundary.rotate + 1.2} ${diagram.boundary.cx} ${diagram.boundary.cy})`}
  fill="none"
  stroke={
    palette.blue
  }
  strokeWidth=".5"
  opacity=".17"
/>

        {/* BOUNDARY TITLE */}

        <text
          x={
            diagram.boundary.cx
          }
          y={
            diagram.boundary.cy -
            diagram.boundary.ry +
            22
          }
          textAnchor="middle"
          fill={
            palette.blueDark
          }
          fontWeight="700"
          fontSize="14"
          style={{
            fontFamily:
              handwritingFont,

            letterSpacing:
              ".025em",
          }}
        >
          <tspan
            x={
              diagram.boundary.cx
            }
            dy="0"
          >
            {
              diagram.boundary
                .label[0]
            }
          </tspan>

          <tspan
            x={
              diagram.boundary.cx
            }
            dy="17"
          >
            {
              diagram.boundary
                .label[1]
            }
          </tspan>
        </text>

        {/* INTERACTIVE VENN CIRCLES */}

        {diagram.nodes.map(
          (
            node,
          ) => (
            <InteractiveVennNode
              key={
                node.id
              }
              node={
                node
              }
              width={
                width
              }
              height={
                height
              }
            />
          ),
        )}

        {/* SHARED INTERSECTION */}

        <g
          style={{
            transformBox:
              "fill-box",

            transformOrigin:
              "center",

            transform:
              overlapActive
                ? "scale(1.12)"
                : "scale(1)",

            transition:
              "transform 180ms ease",
          }}
        >
          <path
            d={
              diagram.overlap
                .path
            }
            fill={
              overlapActive
                ? "rgba(65,65,65,.48)"
                : "rgba(70,70,70,.34)"
            }
            stroke={
              overlapActive
                ? "rgba(25,25,25,.95)"
                : "rgba(35,35,35,.70)"
            }
            strokeWidth={
              overlapActive
                ? 1.3
                : 0.9
            }
            filter="url(#rough-pencil)"
          />

          {/* CROSS HATCH */}

          <path
            d={`
              M ${diagram.overlap.cx - 14}
              ${diagram.overlap.cy - 10}
              L ${diagram.overlap.cx + 12}
              ${diagram.overlap.cy + 13}

              M ${diagram.overlap.cx - 17}
              ${diagram.overlap.cy - 2}
              L ${diagram.overlap.cx + 8}
              ${diagram.overlap.cy + 17}

              M ${diagram.overlap.cx - 7}
              ${diagram.overlap.cy - 16}
              L ${diagram.overlap.cx + 17}
              ${diagram.overlap.cy + 6}

              M ${diagram.overlap.cx - 14}
              ${diagram.overlap.cy + 10}
              L ${diagram.overlap.cx + 10}
              ${diagram.overlap.cy - 14}

              M ${diagram.overlap.cx - 8}
              ${diagram.overlap.cy + 16}
              L ${diagram.overlap.cx + 16}
              ${diagram.overlap.cy - 7}
            `}
            fill="none"
            stroke="rgba(40,40,40,.55)"
            strokeWidth=".65"
            filter="url(#rough-pencil-light)"
          />
        </g>

        {/* OVERLAP ANNOTATION */}

        <path
          d={`
            M ${diagram.overlapAnnotation.lineStartX}
            ${diagram.overlapAnnotation.lineStartY}

            C ${diagram.overlapAnnotation.lineStartX + 55}
            ${diagram.overlapAnnotation.lineStartY + 4},

            ${diagram.overlapAnnotation.x - 35}
            ${diagram.overlapAnnotation.y},

            ${diagram.overlapAnnotation.x - 8}
            ${diagram.overlapAnnotation.y}
          `}
          fill="none"
          stroke={
            palette.blue
          }
          strokeWidth="1.25"
          filter="url(#rough-pencil)"
        />

        {diagram.overlapAnnotation.lines.map(
          (
            line,
            index,
          ) => (
            <text
              key={
                line
              }
              x={
                diagram
                  .overlapAnnotation
                  .x
              }
              y={
                diagram
                  .overlapAnnotation
                  .y +
                index *
                  16
              }
              fontSize="11"
              fill={
                palette.blue
              }
              style={{
                fontFamily:
                  handwritingFont,
              }}
            >
              {line}
            </text>
          ),
        )}

        {/* OVERLAP INTERACTION */}

        <foreignObject
          x={
            diagram.overlap.cx -
            diagram.overlap.rx
          }
          y={
            diagram.overlap.cy -
            diagram.overlap.ry
          }
          width={
            diagram.overlap.rx *
            2
          }
          height={
            diagram.overlap.ry *
            2
          }
          style={{
            overflow:
              "visible",
          }}
        >
          <HoverTarget
            content={
              diagram.overlap
                .description
            }
            preference={
              diagram.overlap
                .popup
            }
            onActiveChange={
              setOverlapActive
            }
            className="h-full w-full cursor-help rounded-full"
          />
        </foreignObject>
      </svg>
    </div>
  );
}

/* ==========================================================================
   STAGE TRACKER
   ========================================================================== */

function StageTracker({
  stages,
}: {
  stages: Stage[];
}) {
  return (
    <div
      className="relative border border-black/30 px-4 pb-5 pt-4"
      style={{
        fontFamily:
          handwritingFont,
      }}
    >
      <span className="inline-block border border-black/30 bg-[#faf7ef] px-2 py-1 text-[10px] uppercase tracking-wide">
        Current Stage
      </span>

      <div className="relative mt-7">
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${stages.length}, minmax(0, 1fr))`,
          }}
        >
          {stages.map(
            (
              stage,
            ) => (
              <div
                key={`${stage.id}-label`}
                className="px-1 text-center text-[10px] leading-tight"
              >
                {
                  stage.label
                }
              </div>
            ),
          )}
        </div>

        <div className="relative mt-4">
          <div
            className="absolute left-[7%] right-[7%] top-1/2 -translate-y-1/2 bg-black/45"
            style={{
              height:
                visualConfig
                  .stageTracker
                  .lineWidth,
            }}
          />

          <div
            className="relative z-10 grid"
            style={{
              gridTemplateColumns: `repeat(${stages.length}, minmax(0, 1fr))`,
            }}
          >
            {stages.map(
              (
                stage,
              ) => {
                const background =
                  stage.status ===
                  "current"
                    ? palette.current
                    : stage.status ===
                        "complete"
                      ? palette.complete
                      : palette.future;

                return (
                  <HoverTarget
                    key={
                      stage.id
                    }
                    content={
                      stage.hoverText ??
                      stage.label
                    }
                    preference={
                      stage.popup ??
                      "top"
                    }
                    className="flex cursor-help justify-center"
                  >
                    <span
                      className="relative z-20 flex items-center justify-center rounded-full border border-black transition-transform duration-200 hover:-translate-y-[2px] hover:scale-110"
                      style={{
                        width:
                          visualConfig
                            .stageTracker
                            .dotSize,

                        height:
                          visualConfig
                            .stageTracker
                            .dotSize,

                        backgroundColor:
                          background,
                      }}
                    >
                      {stage.status ===
                        "complete" && (
                        <span className="text-[10px]">
                          ✓
                        </span>
                      )}
                    </span>
                  </HoverTarget>
                );
              },
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   DIAGRAM ROUTER
   ========================================================================== */

function ProjectDiagram({
  diagram,
}: {
  diagram: DiagramConfig;
}) {
  if (
    diagram.type ===
    "ai-workforce"
  ) {
    return (
      <AIWorkforceDiagram
        diagram={
          diagram
        }
      />
    );
  }

  return (
    <EconomicDevelopmentDiagramView
      diagram={
        diagram
      }
    />
  );
}

/* ==========================================================================
   NOTEBOOK PAGE
   ========================================================================== */

function ResearchPage({
  project,
}: {
  project: Project;
}) {
  return (
    <article
      className="relative border border-black/10 px-10 pb-5 pt-7 shadow-[0_5px_14px_rgba(0,0,0,.08)]"
      style={{
        ...paperStyle,

        minHeight:
          visualConfig
            .page
            .minHeight,

        fontFamily:
          handwritingFont,

        clipPath:
          "polygon(.3% .5%, 99.5% .1%, 99.8% 98.8%, 98.3% 99.8%, 79% 99.3%, 60% 99.8%, 42% 99.3%, 22% 99.8%, .5% 99.1%)",
      }}
    >
      <Tape
        accent={
          project.tape
        }
      />

      <PunchHoles />

      <NotebookDecorations
        decorations={
          project.decorations
        }
      />

      {/* HEADER */}

      <div className="relative z-10 pl-3">
        <div className="flex flex-wrap items-center gap-5">
          <span className="text-[17px] italic">
            {
              project.id
            }
          </span>

          <span className="rounded-[50%] border border-black/65 px-4 py-1 text-[10px] uppercase tracking-wide">
            {
              project.statusLabel
            }
          </span>
        </div>

        <h3 className="mt-5 inline-block border-b-2 border-[#b34d43] pb-1 text-[25px] font-semibold leading-tight">
          {
            project.title
          }
        </h3>

        <div className="mt-4 flex items-start justify-between gap-5">
          <p className="max-w-[390px] text-[14px] leading-[1.65]">
            {
              project.question
            }
          </p>

          <p
            className="max-w-[150px] text-[12px] leading-relaxed"
            style={{
              color:
                palette.blue,

              transform:
                "rotate(-2deg)",
            }}
          >
            {
              project.annotation
            }

            {project.annotationArrow &&
              ` ${project.annotationArrow}`}
          </p>
        </div>
      </div>

      {/* DIAGRAM */}

      <div className="relative z-20 mt-1 flex min-h-[385px] items-center justify-center">
        <ProjectDiagram
          diagram={
            project.diagram
          }
        />
      </div>

      {/* BOTTOM NOTE */}

      <div
        className="mb-3 flex justify-end pr-2 text-[12px] italic"
        style={{
          color:
            palette.blue,
        }}
      >
        <span className="mr-2">
          ←
        </span>

        {
          project.footerNote
        }
      </div>

      <StageTracker
        stages={
          project.stages
        }
      />
    </article>
  );
}

/* ==========================================================================
   RESEARCH JOURNEY
   ========================================================================== */

function ResearchJourney() {
  const milestones =
    researchJourney.milestones;

  return (
    <section
      className="relative mt-7 border border-black/10 px-8 pb-8 pt-5 shadow-[0_4px_11px_rgba(0,0,0,.07)]"
      style={{
        ...paperStyle,

        fontFamily:
          handwritingFont,

        clipPath:
          "polygon(.3% 1%, 99.6% .4%, 99.8% 98%, 88% 99%, 69% 98.3%, 51% 99.2%, 31% 98.5%, .5% 99%)",
      }}
    >
      {/* PIN */}

      <div className="absolute left-4 top-2">
        <div className="h-[15px] w-[15px] rounded-full border border-black/30 bg-[#b9943e] shadow-md" />

        <div className="mx-auto h-5 w-px rotate-[5deg] bg-black/45" />
      </div>

      <h3 className="pl-9 text-[14px] font-semibold uppercase tracking-wide">
        {
          researchJourney.title
        }
      </h3>

      <div className="relative mt-7">
        {/* TIMELINE LINE */}

        <div
          className="absolute left-[3%] right-[3%] top-[8px] bg-black/55"
          style={{
            height:
              visualConfig
                .timeline
                .lineWidth,
          }}
        />

        {/* MILESTONE DOTS */}

        <div
          className="relative z-10 grid"
          style={{
            gridTemplateColumns: `repeat(${milestones.length}, minmax(0, 1fr))`,
          }}
        >
          {milestones.map(
            (
              milestone,
            ) => {
              const background =
                milestone.status ===
                "current"
                  ? "#efa91f"
                  : milestone.status ===
                      "complete"
                    ? palette.blue
                    : "#f8f5ed";

              return (
                <HoverTarget
                  key={
                    milestone.id
                  }
                  content={
                    <>
                      <strong>
                        {
                          milestone.semester
                        }
                      </strong>

                      <p className="mt-1">
                        {
                          milestone.hoverText
                        }
                      </p>
                    </>
                  }
                  preference={
                    milestone.popup
                  }
                  className="flex cursor-help justify-center"
                >
                  <span
                    className="relative z-20 block rounded-full border border-black transition-all duration-200 hover:-translate-y-[3px] hover:scale-125"
                    style={{
                      width:
                        visualConfig
                          .timeline
                          .dotSize,

                      height:
                        visualConfig
                          .timeline
                          .dotSize,

                      backgroundColor:
                        background,

                      boxShadow:
                        milestone.status ===
                        "current"
                          ? "0 0 0 5px rgba(231,166,30,.15)"
                          : "none",
                    }}
                  />
                </HoverTarget>
              );
            },
          )}
        </div>

        {/* MILESTONE TEXT */}

        <div
          className="mt-4 grid"
          style={{
            gridTemplateColumns: `repeat(${milestones.length}, minmax(0, 1fr))`,
          }}
        >
          {milestones.map(
            (
              milestone,
            ) => (
              <div
                key={`${milestone.id}-content`}
                className="px-2 text-center"
              >
                <p
                  className="font-bold uppercase"
                  style={{
                    fontSize:
                      visualConfig
                        .timeline
                        .dateFontSize,
                  }}
                >
                  {
                    milestone.date
                  }
                </p>

                <p
                  className="mt-1"
                  style={{
                    fontSize:
                      visualConfig
                        .timeline
                        .semesterFontSize,
                  }}
                >
                  {
                    milestone.semester
                  }
                </p>

                <p
                  className="mt-3"
                  style={{
                    fontSize:
                      visualConfig
                        .timeline
                        .titleFontSize,

                    lineHeight:
                      visualConfig
                        .timeline
                        .lineHeight,
                  }}
                >
                  {
                    milestone.title
                  }
                </p>

                <p
                  className="mt-2 italic"
                  style={{
                    fontSize:
                      visualConfig
                        .timeline
                        .noteFontSize,

                    lineHeight:
                      visualConfig
                        .timeline
                        .lineHeight,

                    color:
                      milestone.status ===
                      "current"
                        ? palette.gold
                        : milestone.status ===
                            "future"
                          ? "#745b98"
                          : palette.blue,
                  }}
                >
                  {
                    milestone.note
                  }
                </p>
              </div>
            ),
          )}
        </div>
      </div>

      <p className="mt-6 text-center text-[9px] italic text-neutral-600">
        {
          researchJourney.disclaimer
        }
      </p>
    </section>
  );
}

/* ==========================================================================
   MAIN COMPONENT
   ========================================================================== */

export default function FeaturedResearch() {
  return (
    <section className="relative border-t border-black/10 bg-[#f8f5ed] px-6 py-20 md:px-12 lg:px-16">
      <div className="mx-auto max-w-[1500px]">

        {/* SECTION HEADER */}

        <header className="mb-10 grid gap-8 lg:grid-cols-[1.15fr_.8fr_.45fr] lg:items-end">
          <div>
            <p
              className="mb-2 text-[13px] uppercase tracking-[.23em]"
              style={{
                fontFamily:
                  handwritingFont,
              }}
            >
              {
                sectionContent.eyebrow
              }
            </p>

            <h2 className="inline-block border-b border-black/35 pb-3 text-5xl font-semibold tracking-tight md:text-6xl lg:text-7xl">
              {
                sectionContent.title
              }
            </h2>
          </div>

          <div
            className="pb-1"
            style={{
              fontFamily:
                handwritingFont,
            }}
          >
            <p className="max-w-[430px] text-[15px] leading-relaxed">
              {
                sectionContent.description
              }
            </p>

            <p
              className="mt-4 inline-block border-b border-[#24519a]/40 pb-1 text-[15px] italic"
              style={{
                color:
                  palette.blue,

                transform:
                  "rotate(-1deg)",
              }}
            >
              {
                sectionContent.handwrittenNote
              }
            </p>
          </div>

          <div className="hidden justify-end pb-2 lg:flex">
            <a
              href={
                sectionContent
                  .link
                  .href
              }
              className="border-b border-black pb-2 text-[11px] uppercase tracking-[.16em] transition hover:-translate-y-1"
              style={{
                fontFamily:
                  handwritingFont,
              }}
            >
              {
                sectionContent
                  .link
                  .label
              }
            </a>
          </div>
        </header>

        {/* NOTEBOOK PAGES */}

        <div className="grid items-stretch gap-7 lg:grid-cols-2">
          {projects.map(
            (
              project,
            ) => (
              <ResearchPage
                key={
                  project.id
                }
                project={
                  project
                }
              />
            ),
          )}
        </div>

        {/* RESEARCH JOURNEY */}

        <ResearchJourney />
      </div>
    </section>
  );
}