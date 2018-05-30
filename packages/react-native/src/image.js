import PropTypes from 'react-proptypes';
import { Image } from 'react-native';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource'

export default class ScaledImage {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        source: PropTypes.number,

        width: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.oneOf(["auto"])
        ]),
        
        height: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.oneOf(["auto"])
        ]),

        children: PropTypes.number
    }

    componentWillMount(){
        var {
            style = false, 
            height = style.height, 
            width = style.width, 
            children,
            source = children || style.source || "", 
            ...props
        } = this.props;

        const img = resolveAssetSource(source)
        if(!img)
            throw new Error(`Scaled image has no source${
                !source ? "" : ` given uri "${source}"`
            }`)

        if(height === undefined && width === undefined)
            var {width, height} = img;
        
        if(height == "auto") height = img.height;
        if(width == "auto") width = img.width;

        if (height === undefined 
        &&  width !== undefined)
            height = img.height * (width / img.width);
            
        if (width === undefined 
        &&  height !== undefined)
            width = img.width * (height / img.height);

        this.setState({
            width, height, style, props, source
        })
    }

    ScaledImage(){
        const {width, height, style, source, props} = this.state;

        Image(...props, +source, ~style, ~{
            width: width,
            height: height
        })
    }
}