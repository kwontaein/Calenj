import {EventManagement_Container, SubNavigateTopBar} from '../../style/Navigation/EventManagementStyle'
import {useQueryClient} from "@tanstack/react-query";

interface NavigateProps{
    navigate:string;
}

const EventManagementBar : React.FC<NavigateProps> = ({navigate}) =>{
    const queryClient = useQueryClient();

    // queryClient.getQueriesData([])

    return (
        <EventManagement_Container>
            <SubNavigateTopBar>
                {navigate === "group" &&
                    <div></div>
                }
            </SubNavigateTopBar>
        </EventManagement_Container>
    )
}
export default  EventManagementBar;