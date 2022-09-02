import React from "react";
type Go = (view: String, params: any) => void;

export default interface RouterProps {
  params: URLSearchParams | null,
  view: String,
  token: String | null,
  go: Go,
  back: Go
}