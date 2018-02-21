import { connect } from 'react-redux';
import { Dashboard as Component } from './presentational';
import { fetchUBSes, selectUBSCSVFile, syncUBSes, checkProcess } from './actions';


export const mapStateToProps = state =>
{
    return {
        'googlemaps': state.dashboard.googlemaps
    }
}

export const mapDispatchToProps = dispatch =>
{

    dispatch(checkProcess());
    return {
        'fetchUBSByBoundaries': boundaries => dispatch(fetchUBSes(boundaries)),
        
        'selectCSVFile': e => {
            let reader = new FileReader();

            reader.onload = file =>
            {
                dispatch(selectUBSCSVFile(file.target.result));
            }

            reader.readAsText(e.target.files[0]);
        },

        'syncCSV': file => dispatch(syncUBSes(file))
    }
}

document.title = 'Bionexo Challenge - Dashboard';
export const Dashboard = connect(mapStateToProps, mapDispatchToProps)(Component);