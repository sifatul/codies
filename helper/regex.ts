export const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const githubUrlRegex = /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_]{1,25}$/gim;

export const linkedInUrlRegex =
    /((https?:\/\/)?((www|\w\w)\.)?linkedin\.com\/)((([\w]{2,3})?)|([^\/]+\/(([\w|\d-&#?=])+\/?){1,}))$/;

export const leetcodeUrlRegex = /^(https?:\/\/)?(www\.)?leetcode\.com\/[a-zA-Z0-9_]{1,25}$/gim;

export const hackerrankUrlRegex = /^(https?:\/\/)?(www\.)?hackerrank\.com\/[a-zA-Z0-9_]{1,25}$/gim;

export const codepenUrlRegex = /^(https?:\/\/)?(www\.)?codepen\.io\/[a-zA-Z0-9_]{1,25}$/gim;
