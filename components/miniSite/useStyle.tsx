import { makeStyles } from 'tss-react/mui';
export const useStyles = makeStyles()((theme) => {
    return {

    miniSiteCenter: {
        maxWidth: "1440px",
        margin: "0px auto",
        width: "100%"
    },
    categoryContaineer: {
        position: "fixed",
        top: "-300",
        zIndex: 999,
        transition: "all 300ms ease-in-out",
        boxShadow: "0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)"
    },
    categoryContaineerActive: {
        position: "fixed",
        top: "0",
        zIndex: 999,
        boxShadow: "0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)"
    }
}
})
