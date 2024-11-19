
export type dbUserType = {
    avatar: string | null;
    created_at: string;
    id: number;
    username: string;
    email: string;
}

export type suggestionData = {
    usersCollection: {
        edges: [
            {
                node: {
                    id: number
                    username: string
                    avatar: string
                    folowers_listCollection: {
                        edges: [
                            {
                                node: {
                                    folowing_id: number
                                }
                            }
                        ]

                    }
                }
            }
        ]
    }

}

export type taggedInUser = { id: number, avatar: string | null, username: string }

export type data = { edges: [{ node: any }] }

export type post = {
    id: number,
    caption: string;
    file_url: string;
    created_at: string;
    users: {
        id: number;
        username: string;
        email: string;
        avatar: string | null;
    }

}

export type postsType = {
    id: number;
    avatar: string | null;
    username: string;
    email: string;
    caption: string;
    createdAt: string;
    fileUrl: string;
}


export type suggestedUser = { username: string; id: number; is_following: boolean; avatar: string }
