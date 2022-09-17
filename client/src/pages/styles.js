import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    appBar: {
        padding: '5px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      heading: {
        fontFamily: 'Franklin Gothic Medium',
        color: 'rgb(35, 38, 35)',
        textDecoration: 'none',
        fontSize: '30px',
      },
      brandContainer: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: '15px',
      },
      searchBar: {
        display: 'flex',
        marginRight: '20px',
        width: '600px'
      },
      paper: {
        padding: theme.spacing(2),
      },
      form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
      },
      alert: {
        marginBottom: '30px',
      },
      container: {
        padding: '50px'
      }
}))