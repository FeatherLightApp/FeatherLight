declare module '*.vue' {
    import Vue from 'vue'
    export default Vue
}

declare module '*.svg' {
    const content: any;
    export default content;
}

// declaring module will allow typescript to import the module
declare module 'vue-qrcode-reader'
