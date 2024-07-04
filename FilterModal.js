export default function FilterModal(props) {
    function handleSubmit(event) {
        event.preventDefault();
        const data = event.target.elements;
        console.log(data);
        let keys = [],
            values = [];
        for (let i = 0; i < data.length; i++) {
            console.log(data[i]);
            if (data[i].value !== "") {
                keys.push(data[i].id);
                values.push(data[i].value);
            }
        }
        console.log(keys, values);
        props.setToggle(false);
        console.log(props.list);
        const result = props.list.filter((item) => {
            let flag = true;
            for (let i = 0; i < keys.length; i++) {
                if (item[keys[i]] !== values[i]) {
                    flag = false;
                    break;
                }
            }
            return flag;
        });
        console.log(result);
        props.filter(result);
    }
    return (
        <div className="modal form-container-parent">
            <form
                onSubmit={handleSubmit}
                className="modal-content form-container"
            >
                <button className="close-button close-button-add">X</button>
                <input
                    type="text"
                    id="event_name"
                    className="form-container-item"
                    placeholder="Event Name"
                />
                <input
                    type="text"
                    id="city"
                    className="form-container-item"
                    placeholder="City"
                />
                <input
                    type="text"
                    id="organizer"
                    className="form-container-item"
                    placeholder="Organizer"
                />
                <input
                    type="time"
                    id="time"
                    className="form-container-item"
                    placeholder="Time"
                />
                <input
                    type="date"
                    id="date"
                    className="form-container-item"
                    placeholder="Date"
                />
                <button type="submit" className="form-container-item">
                    Submit
                </button>
            </form>
        </div>
    );
}
