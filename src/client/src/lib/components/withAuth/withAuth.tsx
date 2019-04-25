import * as React from "react";
import { fromEvent } from "rxjs";
import { getToken } from "../../../helpers/authGuard";
import { AuthService } from "../../../services/AuthService";

const key = "__token";
const win = (window as any);

const authTokenObservable = fromEvent<CustomEvent<string | null>>(document, "authTokenChange");

const onAuthTokenChange = (cb: (authToken: string | null) => void) => {
    authTokenObservable.subscribe({
        next: val => {
            cb(val.detail);
        }
    });
};

interface WithAuthProps {
    cb: (props: AuthProps) => JSX.Element
    location?:any;
}

interface WithAuthState {
    authToken: string | null;
    location:any;
}

class WithAuth extends React.Component<WithAuthProps, WithAuthState> {
    public constructor(props: WithAuthProps) {
        super(props);
        this.state = {
            authToken: getToken(),
            location: this.props.location,
        };
        onAuthTokenChange(value => this.setState({ authToken: value }));
    }
    public render() {
        return (
            <React.Fragment>
                {this.props.cb({ authToken: this.state.authToken })}
            </React.Fragment>
        );
    }
}

export interface AuthProps {
    authToken: string | null;
}

export function withAuth(cb: (props: any) => JSX.Element) {
    return () => <WithAuth cb={cb} location={location}/>;
}

export const setAuthToken = async (token: string | null) => {
        const authService = new AuthService();

        if(token) {
            localStorage.setItem('marble', token);
            
            const loggedUser = await authService.authUser();
            
            localStorage.setItem('marbleLoggedUser', JSON.stringify(loggedUser)); 
        }

        
        const authTokenChangeEvent = new CustomEvent("authTokenChange", { detail: token });
        document.dispatchEvent(authTokenChangeEvent);

};