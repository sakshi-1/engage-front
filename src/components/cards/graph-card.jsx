import {Bar,Line} from 'react-chartjs-2';
import './basic-card-styles.css';

const BasicCard = ({title,data_labels,data_values,y_label})=>{
    const state={
        labels: data_labels,
        datasets: [{
            label: y_label,
            backgroundColor: "rgba(128,10,128,0.8)",
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 1,
            data: data_values
        }]
    }
    return(
        <div className="card-body graph-card">
            <div className="card-head-text">
                <h2>{title}</h2>
                <div>
                    <Bar
                        data={state}
                        options={{
                            legend:{
                                display: true,
                                position: 'right'
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default BasicCard;
/*
<p className="sub-text">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam repellat illo ducimus beatae commodi, perspiciatis, repellendus quaerat quae quos atque sapiente id laboriosam totam voluptas soluta! Commodi cum a in.
</p>
*/