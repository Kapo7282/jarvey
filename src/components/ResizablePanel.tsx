import React from 'react';
import { Resizable } from 're-resizable';

interface ResizablePanelProps {
  children: React.ReactNode;
  width: number;
  minWidth?: number;
  maxWidth?: number;
  onResize: (width: number) => void;
  className?: string;
}

export const ResizablePanel: React.FC<ResizablePanelProps> = ({
  children,
  width,
  minWidth = 200,
  maxWidth = 600,
  onResize,
  className = '',
}) => {
  return (
    <Resizable
      size={{ width, height: '100%' }}
      minWidth={minWidth}
      maxWidth={maxWidth}
      enable={{
        top: false,
        right: true,
        bottom: false,
        left: true,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
      onResizeStop={(e, direction, ref, d) => {
        onResize(width + d.width);
      }}
      className={className}
    >
      {children}
    </Resizable>
  );
};