import { observable } from 'mobx';

const InfoStore = observable({

    // state
    info: {
        title: 'Learn Mobx',
        context: 'Info Store'
    },

    // action
    setInfo(title, context) {

        this.info = {...this.info, title, context}
    },

})

export default InfoStore;