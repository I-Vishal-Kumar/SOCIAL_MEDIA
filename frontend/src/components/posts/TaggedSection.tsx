import { User } from "@auth0/auth0-react";
import { AvatarGroup, Tooltip, Avatar, Autocomplete, TextField } from "@mui/material";
import useUserTagMutation from "../../(hooks)/useUserTagMutation";

const TaggedSection = ({ postId }: { postId: number }) => {

    const {
        taggedUsers, users, setSelectedUser, selectedUser,
        handleInputChange, handleTagUser, loading } = useUserTagMutation(postId);

    return (
        <div className="flex gap-x-2 items-center">
            <div>
                <AvatarGroup>
                    {taggedUsers.map((user: any) => (
                        <Tooltip title={user?.username} >
                            <Avatar sx={{ height: 20, width: 20 }} key={user.id} src={user.avatar} alt={user.username} />
                        </Tooltip>
                    ))}
                </AvatarGroup>
            </div>
            <div className="flex gap-x-2 items-center">
                Tag another user -
                <Autocomplete
                    options={users}
                    value={selectedUser}
                    getOptionLabel={(option: User) => option.username}
                    onInputChange={handleInputChange}
                    onChange={(_, newValue: User | null) => setSelectedUser(newValue)}
                    loading={loading}
                    renderInput={(params) => <TextField {...params} sx={{ '& fieldset': { display: 'none' } }} size="small" type="text" placeholder="Enter a username" />}
                    renderOption={(props, option) => (
                        <li {...props}>
                            <span className="ml-2">{option.username}</span>
                        </li>
                    )}
                />
                {
                    users.length ? (
                        <button onClick={handleTagUser} type="button" className="bg-blue-400 px-10 py-1 text-white rounded-md ">Tag</button>
                    ) : null
                }
            </div>
        </div>

    )
}
export default TaggedSection