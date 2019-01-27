import { TweenMax, TweenLite, TimelineLite, TimelineMax } from "gsap";
import { Component } from "react";

interface SceneProps {
    trigger: string;
    hook?: number | string;
    offset?: number | string;
    duration?: number;
    debug?: boolean;
}

interface OnScrollProps extends SceneProps {
    toggle: string;
    active: string;
}

interface TweenProps<T> extends SceneProps {
    children: [ (tweenLike: T) => void ];
    declare?: (tweenLike: T) => void;
}

declare class OnScroll extends Component<OnScrollProps, any>{};
declare class Timeline extends Component<TweenProps<TimelineLite>, any> {};
declare class TimelineMax extends Component<TweenProps<TimelineMax>, any> {};
declare class Tween extends Component<TweenProps<TweenLite>, any> {};
declare class TweenMax extends Component<TweenProps<TweenMax>, any> {};