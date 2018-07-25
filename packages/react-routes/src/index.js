export { MemoryRouter } from "react-router-dom"

import { Switch, Route as LibRoute } from "react-router-dom";
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import React from "react"

export const Route = (props) => do {
    const {
        children,
        to,
        exact,
        path,
        callback,
        render
    } = props;

    LibRoute(
        component = callback || children,
        exact = exact,
        path = to
    )
}

export const AnimateRoutes = (props) => do {
    const {
        children,
        style,
        states,
        duration,
        className,
        classNames,
        ...extra
    } = props;

    LibRoute(
        render = ({ location }) => do {
            TransitionGroup(/*component = null*/) >> 
                CSSTransition(...extra), do {
                    key = location.key;
                    classNames = classNames || states || "fade"
                    timeout = duration || 300;

                    container(~style, +className) >> 
                        Switch(+location) > 
                            children;
                }
        }
    )
}
