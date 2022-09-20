export const getEmailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const getGithubUrlRegex = /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_]{1,25}$/gim;

export const getLinkedInUrlRegex =
    /((https?:\/\/)?((www|\w\w)\.)?linkedin\.com\/)((([\w]{2,3})?)|([^\/]+\/(([\w|\d-&#?=])+\/?){1,}))$/;

export const getLeetcodeUrlRegex = /^(https?:\/\/)?(www\.)?leetcode\.com\/[a-zA-Z0-9_]{1,25}$/gim;

export const getHackerrankUrlRegex =
    /^(https?:\/\/)?(www\.)?hackerrank\.com\/[a-zA-Z0-9_]{1,25}$/gim;

export const getCodepenUrlRegex = /^(https?:\/\/)?(www\.)?codepen\.io\/[a-zA-Z0-9_]{1,25}$/gim;

export const getPhoneNumberRegex = /^(?:(?:\+|00)88|01)?\d{11}$/;
