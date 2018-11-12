
// import Dynamic from 'react-no-ssr';

export const Style = ({children, global}) => do {
    html-style(
        jsx `true`, 
        global = global ? "true" : "false",
        dangerouslySetInnerHTML = {__html: children}
    )
}

export class StyleSheet {
    StyleSheet({children}){
        html-link(
            rel `stylesheet`,
            type `text/css`,
            href = children
        )
    }
}

// export class Script {
//     Script({callback, children}){
//         if(typeof children == "function"){{
//             callback = children;
//         }}
//         const Insertion = class {
//             do(){ [false]; }
//             componentDidMount(){
//                 callback()
//             }
//             shouldComponentUpdate(){
//                 return false;
//             }
//         }
//         Dynamic >> Insertion
//     }
// }

export const StyleFillHeight = ({forID}) => do {
    Style() `
        #${forID} {
            min-height: 100vh
        }
        @media only screen 
            and (device-width : 375px) 
            and (device-height : 812px) 
            and (-webkit-device-pixel-ratio : 3)
            and (orientation : portrait) {
            #${forID} {
                min-height: 635px;
            }
        }
        @media only screen 
        and (device-width : 375px) 
        and (device-height : 667px) 
        and (orientation : portrait) {
            #${forID} {
                min-height: 556px;
            }
        }
    `
}