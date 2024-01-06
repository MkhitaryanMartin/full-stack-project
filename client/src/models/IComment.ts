import { MouseEvent } from "react";

export interface IComment {
    _id: string;
    text: string;
    dateCreate: string;
    author: {
      profile: {
        name: string;
        photo?: string
      };
      _id: string;
    };
    parent: {
      _id: string;
      _type: string;
      text?: string;
      name?: string
    };
    isDeleted: boolean;
  }

  export interface IAddComment{
    _id: string;
    text: string;
    parent:{_id: string, _type: "comment"| "article"}
  }

  export type ISubmitComment =  (data: {comment:string} , parent: {_id:string, _type:"comment"| "article", _article?: string})=>void
