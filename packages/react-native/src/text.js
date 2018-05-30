
import React, { Component } from "react"
import { Text, Animated, StyleSheet } from "react-native"

export default class QuickText extends Component {

    static Animated (raw_props) {
        const {style: styleID, is: innerText, children, ...props} = raw_props,
              {color, fontSize, fontWeight, ...style} = StyleSheet.flatten(styleID);

        return (
            <Animated.View {...props} style={style}>
                <Text style={{color, fontSize, fontWeight}}>
                    {innerText || children}
                </Text>
            </Animated.View>
        )
    }

    render(){
        var {is: txt, children: alt, ...props} = this.props;
        return (
            <Text allowFontScaling={false} {...props}>
                {txt || alt}
            </Text>
        )
    }
}