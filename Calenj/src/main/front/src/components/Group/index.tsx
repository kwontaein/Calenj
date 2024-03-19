import GroupList from "./GroupList"
import GroupDetail from "./GroupDetail";


const Group: React.FC = () => {
    return (
        <div>
            <GroupList cookie={false}/>
        </div>
    )
}

export default Group;