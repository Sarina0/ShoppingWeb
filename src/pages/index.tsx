/* By Yoonseo, Sarina @Flaminglets
this page is main page
it displays dashboard and all posts
dashboard will only be displayed if the currentPage is == 1 */

import * as React from 'react';
import {useState, useEffect} from 'react';
import styles from '../styles/Home.module.sass'
import Footer from '../components/footer';
import Homepage from '../components/homepage';
import Goods from "../components/goods";
import {ITEMS_PER_PAGE} from '../constants';
import { getAddPosts, getGoods } from '../../lib/backend/database';
import Pagination from '@mui/material/Pagination';

// @params: list of all the post datas in the database
// @return: Homepage function from homepage file, Posts from postType file, and Footer
export default function Home(props) {
    const [currentPage, setCurrentPage] = useState(1);
    const [goods, setGoods] = useState({goods: []});
    const pages = Math.ceil(props.goods.length / ITEMS_PER_PAGE);

    // pagination
    /* The current page start at 1
    This function gets all the posts and stores it in an array then with the variable ITEMS_PER_PAGE
    first devides all the post by the variable so we get the number of pages 
    then we create another array data =[] for arranging numbers of posts per page
    this makes each page have certain posts (data) assigned to them. */
    useEffect(() => {
        let data = [];
        if (props.goods && props.goods.length > 0) {
            data = props.goods.slice((currentPage - 1) * ITEMS_PER_PAGE, (currentPage) * ITEMS_PER_PAGE);
            setGoods({goods: data});
        }
    }, [currentPage]);

    function onChangePage($event, page) {
        setCurrentPage(page);
    }

    // resource: https://mui.com/components/app-bar/#back-to-top
    // goes to the top of the page when pagination buttons are clicked
    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector(
            "#top",
        );
        if (anchor) {
            anchor.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    };

    return (
        <div className={styles.home}>
            {currentPage == 1 && (
                <Homepage props={props}/>
            )}
            <Goods props={goods} />
            <div className="home_pagination_div">
                <Pagination
                    count={pages}
                    onChange={(event, page) => onChangePage(event, page)}
                    shape="rounded"
                    className="home_pagination"
                    onClick={handleClick}/>
            </div>
            <Footer/>
        </div>
    );
};

// getting all the posts from database
// @return: list of posts data
export async function getServerSideProps() {
    const goodData = await getGoods();
    const goods = goodData.reverse().map(
        (good) => {
            return {
                id: good.id.toString(),
                name: good.name || null,
                witch: good.witch || null,
                material: good.material || null,
                width: good.width || null,
                length: good.length || null,
                weight: good.weight || null,
                location: good.location || null,
                description: good.description || null,
                price: good.price || null,
                createdAt: good.createdAt || null,
                images: good.images || null,
            };
        }
    );
    return {
        props : {
            goods
        }
    }
}
