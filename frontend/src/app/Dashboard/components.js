import { connect } from 'react-redux';
import { Dashboard as Component } from './presentational';
import { fetchUBSes } from './actions';


export const mapStateToProps = state =>
{
    return {
        'googlemaps': state.dashboard.googlemaps
    }
}

export const mapDispatchToProps = dispatch =>
{
    return {
        'fetchUBSByBoundaries': boundaries => dispatch(fetchUBSes(boundaries))
    }
}

document.title = 'Bionexo Challenge - Dashboard';
export const Dashboard = connect(mapStateToProps, mapDispatchToProps)(Component);