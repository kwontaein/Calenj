import {endPointMap} from "../../../store/module/StompMiddleware";
import {InfiniteData, QueryObserverResult, RefetchOptions} from "@tanstack/react-query";
import {requestFile} from "../../../store/module/StompReducer";
import {useDispatch} from "react-redux";
import {QUERY_NEW_CAHT_KEY} from "../../../entities/ReactQuery/model/queryModel";
import {queryClient} from "../../../index";


