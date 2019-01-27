import { TimelineLite } from "gsap";

require("./lib/ScrollMagic");
require("./lib/animation.gsap");
require("./lib/debug.addIndicators")

const { ScrollMagic } = window;

let globalController;

function SceneFrom(props){
    let {
        trigger,
        hook = 0,
        offset,
        duration,
        debug
    } = props;

    const config = {
        triggerElement: trigger,
        triggerHook: hook,
    };

    if(duration)
        config.duration = duration + (
            typeof duration == "number" ? "px" : ""
        );
        
    if(offset)
        config.offset = offset + (
            typeof offset == "number" ? "px" : ""
        );
        
    const scene = new ScrollMagic.Scene(config);

    if(debug)
        scene.addIndicators();

    scene.addTo(globalController);

    return scene;
}

function Script(callback){
    return class {
        render(){ return false }
        shouldComponentUpdate(){ return false }
        componentDidMount(){
            callback(this.props)
        }
    } 
}

export const getController = () => globalController;

export const SetupScrollMagic = Script(() => {
    if(globalController)
        globalController.destroy(true);

    globalController = new ScrollMagic.Controller();
})

export const Scene = (params) => {
    new Scene(params).addTo(globalController);
}

export const OnScroll = 
    Script((props) => {
        let { toggle, active = "active" } = props;
        SceneFrom(props).setClassToggle(toggle, active);
    })

const Injectable = (Using) => 
    Script((props) => {

        const init = props.children;
        if(typeof init !== "function")
            throw new Error("A function is required to be only child in a Timeline element.")
                
        const scene = SceneFrom(props)
        const tweenLike = new Using();
        init(tweenLike);
        scene.setTween(tweenLike);
    })

export const Timeline = Injectable(TimelineLite);
export const TimelineMax = Injectable(TimelineMax);
export const Tween = Injectable(TweenLite);
export const TweenMax = Injectable(TweenMax);