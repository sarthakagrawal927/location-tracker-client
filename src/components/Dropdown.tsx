import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { User, UserDict } from "../helpers/types";

type PhoneInputProps = {
    activeEmployee: User | null,
    setActiveEmployee: Dispatch<SetStateAction<User | null>>
}

const Dropdown = ({ activeEmployee, setActiveEmployee }: PhoneInputProps) => {
    const [activeUsers, setActiveUsers] = useState<UserDict>({})

    useEffect(() => {
        (async () => await fetchUsers())()
    }, [])

    const fetchUsers = async () => {
        // const { users } = (await fetch(`${process.env.REACT_APP_SERVER_URL}/users`)).json()
        const { users } = {
            users: [{
                username: 'test',
                phone: '1',
            }, {
                username: 'test2',
                phone: '2',
            }]
        }

        let newObj: UserDict = {}
        users.forEach((user: User) => {
            newObj[user.phone] = {
                active: false,
                username: user.username,
            }
        })
        setActiveUsers(newObj)
    }
    return (
        <select value={activeEmployee?.phone} onChange={(e) => {
            // add code to unsubscribe existing user
            setActiveEmployee({ username: activeUsers[e.target.value].username, phone: e.target.value })
        }}>
            {Object.keys(activeUsers).map(phone => {
                return <option value={phone}>{activeUsers[phone].username}</option>
            })}
        </select>
    );
};

export default Dropdown;