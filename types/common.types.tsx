enum SearchByType {
    NAME = 'name',
    URL = 'url',
    NONE = 'none',
    EMAIL = 'email',
}

enum Filter {
    GITHUB = 'GITHUB',
    LINKEDIN = 'LINKEDIN',
    CODEPEN = 'CODEPEN',
    HACKERRANK = 'HACKERRANK',
    LEETCODE = 'LEETCODE',
    MEDIUM = 'MEDIUM'
}

enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other',
}
enum SocialLoginPlatform {
    GOOGLE = 'GOOGLE',
    GITHUB = 'GITHUB',
}

export { SearchByType, Filter, Gender, SocialLoginPlatform };
