// created and modified by Sarina for exam
/* By Yoonseo @Flaminglets
this file contains function to display post cards
passing each post information to postCard */
import PostCard from './cards';
import {alpha, styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from '@mui/icons-material/Search';
import {useEffect, useState} from "react";
import {ITEMS_PER_PAGE} from "../constants";

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
export default function Goods(props) {
    const [search, setSearch] = useState("");
    const [goods, setGoods] = useState(props.props.goods);

    useEffect(() => {
        filterGoods();
    }, [props.props.goods]);

    const handleSearch = (event) => {
        setSearch(event.target.value)
    }

    const filterGoods = () => {
        const filtered = [];
        const searchString = search ? search.toLowerCase() : '';
        if (searchString) {
            if (props.props.goods && props.props.goods.length > 0) {
                for (const item of props.props.goods) {
                    let isMatched = false;
                    if (item.name && item.name.toLowerCase().indexOf(searchString) >= 0) {
                        isMatched = true;
                    }
                    if (item.description && item.description.toLowerCase().indexOf(searchString) >= 0) {
                        isMatched = true;
                    }
                    if (item.location && item.location.toLowerCase().indexOf(searchString) >= 0) {
                        isMatched = true;
                    }
                    if (item.price && item.price.toString().toLowerCase().indexOf(searchString) >= 0) {
                        isMatched = true;
                    }
                    if (isMatched) {
                        filtered.push(item);
                    }
                }
                setGoods(filtered);
            } else {
                setGoods(props.props.goods);
            }
        } else {
            setGoods(props.props.goods);
        }
    }

    // if user clicks Enter button from keyboard, set search bar input to be empty
    // and redirect to searchposts page with typed word
    const handleFinalSearch = (event) => {
        if (event.key === "Enter") {
            filterGoods();
        }
    }

    return (
        <div>
            <div className="search-bar">
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon sx={{ fill: "#C4C4C4" }} />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        value={search}
                        onChange={handleSearch}
                        onKeyDown={handleFinalSearch}/>
                </Search>
            </div>
            <h1 className="home_title4">Show Your Cursed Knitted Scarf</h1>
            <div className="home_content">
                {goods.map(
                    (good) => {
                        return (
                            <PostCard
                                id={good.id}
                                name={good.name}
                                witch={good.witch}
                                material={good.material}
                                length={good.length}
                                width={good.width}
                                weight={good.weight}
                                location={good.location}
                                description={good.description}
                                images={good.images}
                                createdAt={good.createdAt}
                                price={good.price}
                            />
                        )
                    }
                )
                }
            </div>
        </div>
    );
};
