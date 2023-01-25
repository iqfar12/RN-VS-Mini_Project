import { preload } from "react-native-bundle-splitter";

class NavigationService {
    instance = undefined
    constructor() {
        this.setInstance = this.setInstance.bind(this);
        this.navigate = this.navigate.bind(this);
        this.pop = this.pop.bind(this);
    }

    setInstance(instance) {
        this.instance = instance;
    }

    navigate(screenName, option) {
        if (this.instance) {
            preload().component(screenName).finally(() => {
                this.instance.navigate(screenName, option)
            })
        }
    }

    pop() {
        if (this.instance) {
            this.instance.goBack();
        }
    }
}

export default new NavigationService();