import { cloneElement, Fragment, useState, useMemo, useRef, ReactElement } from "react";
import {
  arrow,
  Placement,
  offset,
  flip,
  shift,
  useFloating,
  useInteractions,
  useHover,
  useFocus,
  useRole,
  useDismiss,
  Strategy,
} from "@floating-ui/react-dom-interactions";
import { mergeRefs } from "react-merge-refs";

import "./Tooltip.css";

type Props = {
  content: ReactElement | string | undefined;
  placement?: Placement;
  /** The type of CSS position property to apply to the floating element, default "absolute" */
  strategy?: Strategy;
  children: JSX.Element;
}

/**
 * Displays content in a popup when the user hovers an element.
 *
 * @remarks
 * The tooltip needs to apply DOM event listeners to its child element. If the child is a custom React element it will
 * need to forward its ref to the underlying DOM element.
 *
 * @example
 * <Tooltip content="Useful info goes here">
 *   <button role="button">Hover me</button>
 * </Tooltip>
 */
export const Tooltip = ({ content, placement = "top",   strategy = "absolute",children }: Props) => {
  const arrowRef = useRef(null);
  const [open, setOpen] = useState(false);

  const { 
    x, 
    y, 
    reference, 
    floating, 
    context,
    middlewareData,
    // The stateful placement, which can be different from the initial `placement` passed as options, e.g. "top" may be
    // flipped to "bottom" if there is not enough room to display the tooltip above the reference element.    
    placement: finalPlacement,
  } = useFloating({
    open,
    placement,
    middleware: [
      offset(8),
      flip(),
      shift({ padding: 5 }),
      arrow({ element: arrowRef }),
    ],
    strategy,
    onOpenChange: setOpen,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, {
      delay: {
        open: 200,
        close: 0,
      },
    }),
    useFocus(context),
    useRole(context, { role: "tooltip" }),
    useDismiss(context),
  ]);

  const staticSide = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  }[finalPlacement.split('-')[0]] ?? '';

  // Preserve the consumer's ref
  const ref = useMemo(
    () => mergeRefs([reference, (children as any).ref]), 
    [reference, children]
  );

  // If there is no tooltip content render the children without the tooltip
  if (content === "" || content == null) {
    return children;
  }
  
  return (
    <Fragment>
      {/* Using the children prop as the reference, attach the ref via cloneElement(). This co-locates the reference 
      with the floating component. */}
      {cloneElement(children, getReferenceProps({ ref, ...children.props }))}
        {open && (
          <div
            className="floating"
            ref={floating}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0
            }}
            {...getFloatingProps()}
          >
            {content}
            <div
              className="arrow"
              ref={arrowRef}
              style={{
                left: middlewareData.arrow?.x != null ? `${middlewareData.arrow.x}px` : '',
                top: middlewareData.arrow?.y != null ? `${middlewareData.arrow.y}px` : '',
                [staticSide]: '-4px',
              }}
            />
          </div>
        )}
    </Fragment>
  );
};
