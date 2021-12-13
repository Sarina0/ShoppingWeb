import React, { useState } from "react";
import { getProviders, signIn, getSession } from "next-auth/client";
import Image from 'next/image';
import socialImg from '../../assets/images/google.png';
import Router from "next/router";
// By Danny @Flaminglets
// Sign in page for users
// The providers are mapped based of [...nextauth].js content.
// Only Google and Facebook is provided as a login method.

export default function LoginRegister({ providers }) {
    const [event] = useState("");

    return (
        <div>
            <div className="register-container">
                <div>
                    <h1 className="h1-title">Login/Register</h1>
                    <button className="provider-button" onClick={() => signIn()}>
                        <Image src={socialImg} width={30} height={30} />
                        <div className="social-text">Sign in With Google</div>
                    </button>
                </div>
            </div>
        </div>
    );
};


// Get the ServerSideProps for LoginRegister based on the context.
// @params context, context provides the props with a request or response
// @return an undefined session, and a Promise for providers and csrftoken
export async function getServerSideProps(context) {
    const { req, res } = context;
    const session = await getSession({ req });
    const providers = await getProviders();
    console.log('session ======>', session);
    if (session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return {
        props: {
            providers,
            session: null,
        }
    };
};
