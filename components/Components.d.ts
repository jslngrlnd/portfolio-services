// Components.d.ts — the complete catalog of the 19 component(s) in
// Components.bundle.js. READ THIS FILE BEFORE USING THE BUNDLE: component
// names are derived from Figma layer names (sanitized to PascalCase,
// deduplicated) and may differ from what the design calls them — the
// "figma layer" comment above each interface maps them back.
// After the bundle <script> loads, every component is a window global
// (e.g. window.ArrowTrendDown1) and usable directly in JSX.
import * as React from 'react';

// figma layer: "Arrow Trend Down 1" (node 19835:35119)
export interface ArrowTrendDown1Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Text" (node 16371:311)
export interface ComponentProps {
  className?: string;
  style?: React.CSSProperties;
  /** Text content; defaults to "Feb 11, 2026". */
  text1?: string;
}

// figma layer: "Text" (node 16371:319)
export interface Component2Props {
  className?: string;
  style?: React.CSSProperties;
  /** Text content; defaults to "10:30 AM". */
  text1?: string;
}

// figma layer: "Container" (node 16371:313)
export interface ContainerProps {
  className?: string;
  style?: React.CSSProperties;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon2?: React.ReactNode;
}

// figma layer: "Container" (node 16371:321)
export interface Container2Props {
  className?: string;
  style?: React.CSSProperties;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon2?: React.ReactNode;
}

// figma layer: "_[DEPRECATED] circle" (node 19060:5443)
export interface DEPRECATEDCircleProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "draw-square" (node 19060:897)
export interface DrawSquareProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Example" (node 19245:8305)
export interface ExampleProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Example Briefing" (node 19236:11892)
export interface ExampleBriefingProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Example Briefing" (node 19236:11926)
export interface ExampleBriefing2Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Icon" (node 16371:306)
export interface IconProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Icon" (node 16371:316)
export interface Icon2Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Icon button" (node 19758:40253)
export interface IconButtonProps {
  className?: string;
  style?: React.CSSProperties;
  icon?: React.ReactNode;
  state?: "default" | "active" | "focus" | "hover" | "disabled" | "selected" | "pressed";
  withAlert?: boolean;
  type?: "default" | "nav";
  label?: boolean;
  /** Text content; defaults to "2". */
  text1?: string;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
}

// figma layer: "Logo" (node 13932:12)
export interface LogoProps {
  className?: string;
  style?: React.CSSProperties;
  size?: "default" | "compact";
  color?: "white" | "black" | "default";
  brand?: "clover assistant" | "counterpart assistant";
}

// figma layer: "microphone" (node 19060:1645)
export interface MicrophoneProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "Patient data" (node 16371:292)
export interface PatientDataProps {
  className?: string;
  style?: React.CSSProperties;
  text?: string;
  /** Text content; defaults to "Willow Jean Humphrey". */
  text1?: string;
  /** Text content; defaults to "Patient ID: #MRN-45892". */
  text2?: string;
  /** Text content; defaults to "Age: 59, 07/21/1966". */
  text3?: string;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
}

// figma layer: "Task status indicator" (node 19758:42002)
export interface TaskStatusIndicatorProps {
  className?: string;
  style?: React.CSSProperties;
  status?: "completed" | "error" | "partial-completion" | "not-started";
}

// figma layer: "Visit data" (node 16371:324)
export interface VisitDataProps {
  className?: string;
  style?: React.CSSProperties;
  /** Text content; defaults to "Dr. Michael Chen, Standard Visit". */
  text1?: string;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
}

// figma layer: "xmark" (node 19758:42000)
export interface XmarkProps {
  className?: string;
  style?: React.CSSProperties;
}

declare const ArrowTrendDown1: React.FC<ArrowTrendDown1Props>;
declare const Component: React.FC<ComponentProps>;
declare const Component2: React.FC<Component2Props>;
declare const Container: React.FC<ContainerProps>;
declare const Container2: React.FC<Container2Props>;
declare const DEPRECATEDCircle: React.FC<DEPRECATEDCircleProps>;
declare const DrawSquare: React.FC<DrawSquareProps>;
declare const Example: React.FC<ExampleProps>;
declare const ExampleBriefing: React.FC<ExampleBriefingProps>;
declare const ExampleBriefing2: React.FC<ExampleBriefing2Props>;
declare const Icon: React.FC<IconProps>;
declare const Icon2: React.FC<Icon2Props>;
declare const IconButton: React.FC<IconButtonProps>;
declare const Logo: React.FC<LogoProps>;
declare const Microphone: React.FC<MicrophoneProps>;
declare const PatientData: React.FC<PatientDataProps>;
declare const TaskStatusIndicator: React.FC<TaskStatusIndicatorProps>;
declare const VisitData: React.FC<VisitDataProps>;
declare const Xmark: React.FC<XmarkProps>;
declare global {
  interface Window {
    ArrowTrendDown1: React.FC<ArrowTrendDown1Props>;
    Component: React.FC<ComponentProps>;
    Component2: React.FC<Component2Props>;
    Container: React.FC<ContainerProps>;
    Container2: React.FC<Container2Props>;
    DEPRECATEDCircle: React.FC<DEPRECATEDCircleProps>;
    DrawSquare: React.FC<DrawSquareProps>;
    Example: React.FC<ExampleProps>;
    ExampleBriefing: React.FC<ExampleBriefingProps>;
    ExampleBriefing2: React.FC<ExampleBriefing2Props>;
    Icon: React.FC<IconProps>;
    Icon2: React.FC<Icon2Props>;
    IconButton: React.FC<IconButtonProps>;
    Logo: React.FC<LogoProps>;
    Microphone: React.FC<MicrophoneProps>;
    PatientData: React.FC<PatientDataProps>;
    TaskStatusIndicator: React.FC<TaskStatusIndicatorProps>;
    VisitData: React.FC<VisitDataProps>;
    Xmark: React.FC<XmarkProps>;
  }
}
