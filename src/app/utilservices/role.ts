import { Injectable } from "@angular/core";

@Injectable()
export class RoleUtil {
    getSeverity(role: string) {
        switch (role) {
            case 'bitSBUHead':
                return { color: 'success', text: "SBU Head" };
            case 'bitSBUOHSOfficer':
                return { color: 'primary', text: "SBU OHS Officer" };

            case 'bitClusterHead':
                return { color: 'success', text: "Cluster Head" };

            case "bitSiteHead":
                return { color: 'success', text: "Site Head" };
            case 'bitSiteOHSOfficer':
                return { color: 'primary', text: "Site OHS Officer" };
        }
        return {color:null, text:null}
    }
}