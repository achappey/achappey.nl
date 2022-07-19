import { ReactPlugin } from "@microsoft/applicationinsights-react-js";
import { ApplicationInsights } from "@microsoft/applicationinsights-web";

export const initInsights = () => {

    if (process.env.REACT_APP_APPINSIGHTS) {
        var reactPlugin = new ReactPlugin();
        
        var appInsights = new ApplicationInsights({
            config: {
                instrumentationKey: process.env.REACT_APP_APPINSIGHTS,
                enableAutoRouteTracking: true,
                extensions: [reactPlugin]
            }
        });

        appInsights.loadAppInsights();
    }

}

