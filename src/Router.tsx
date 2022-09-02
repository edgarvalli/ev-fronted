import React from "react";
import RouterProps from "./interfaces/RouterProps";

type RouterState = {
  view: String;
  params: URLSearchParams | null;
  token: String | null;
};

class Router extends React.Component<any, RouterState> {
  state: RouterState = {
    view: "",
    token: null,
    params: null,
  };

  componentDidMount(): void {
    
    let view = "Clients";
    const token = window.localStorage.getItem("token");
    if (token === null) view = "Login";
    window.history.pushState("app", "App", `/app?v=${view}`);
    
    const params: URLSearchParams = this.getParams();
    view = params.get("v") || view;
    
    this.setState({ view, token, params });
  }

  getParams = (): URLSearchParams => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams;
  };

  go = (view: String, params?: any) => {
    let _view: String = "Login";
    console.log(window.localStorage.getItem("token"))
    if (window.localStorage.getItem("token")) _view = view;

    const basename = "/app";
    let _params = basename + "?v=" + view;
    for (let key in params) {
      _params += `${key}=${params[key]}`;
    }
    window.history.pushState("app", "App", _params);
    this.setState({ view: _view, params: new URLSearchParams(_params) });
  };

  back = () => window.history.back();

  render(): React.ReactNode {
    const props: RouterProps = {
      view: this.state.view || "",
      token: this.state.token || null,
      params: this.state.params || null,
      go: this.go,
      back: this.back,
    };

    const View = React.lazy(() => import(`./views/${props.view}`));
    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        <View {...props} />
      </React.Suspense>
    );
  }
}

export default Router;
