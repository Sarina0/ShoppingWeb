//modified by Sarina
/* By Yoonseo @Flaminglets
this file contains function to display post cards
passing each post information to postCard */
import PostCard from './cards';
import {alpha, styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from '@mui/icons-material/Search';
import {useState} from "react";

// search bar element function from mui website
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));
// @params: list of posts
// @return: PostCard function from cards file, and pass filtered post data
export default function Posts(props) {
    const [search, setSearch] = useState("");

    const handleSearch = (event) => {
        setSearch(event.target.value)
    }

    // if user clicks Enter button from keyboard, set search bar input to be empty
    // and redirect to searchposts page with typed word
    const handleFinalSearch = (event) => {
        if (event.key === "Enter") {
            console.log("enter clicked: ", search)
            setSearch("");
        }
    }

    return (
        <div>
            <div className="search-bar">
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon sx={{ fill: "#EF7827" }} />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        value={search}
                        onChange={handleSearch}
                        onKeyDown={handleFinalSearch}/>
                </Search>
            </div>
            <div className="home_content">
                {/*{props.props.posts.map(*/}
                {/*        (post) => {*/}
                {/*            return (*/}
                {/*                <PostCard */}
                {/*                    id={post.id}*/}
                {/*                    type={post.type}*/}
                {/*                    date={post.date}*/}
                {/*                    time={post.time}*/}
                {/*                    location={post.location}*/}
                {/*                    lostFname={post.lostFname}*/}
                {/*                    lostLname={post.lostLname}*/}
                {/*                    gender={post.gender}*/}
                {/*                    otherGender={post.otherGender}*/}
                {/*                    age={post.age}*/}
                {/*                    weight={post.weight}*/}
                {/*                    height={post.height}*/}
                {/*                    eyecolor={post.eyecolor}*/}
                {/*                    additional={post.additional}*/}
                {/*                    image={post.image}*/}
                {/*                    userFname={post.userFname}*/}
                {/*                    userLname={post.userLname}*/}
                {/*                    phoneNum={post.phoneNum}*/}
                {/*                    email={post.email}*/}
                {/*                />  */}
                {/*            )*/}
                {/*        }*/}
                {/*    )*/}
                {/*}*/}
            </div>
        </div>
    );
};
