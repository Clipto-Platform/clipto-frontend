export const Link = (props: any) => {
    const { url } = props;

    return (
        <a href={url} target='_blank'>
            {props.children}
            <svg style={{ marginLeft: 10 }} width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.14862 0.715751L10.1415 0.755929L10.1015 8.63093M9.58365 1.30001L1.43926 9.24365" stroke="#FFF627" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </a>
    )
}
