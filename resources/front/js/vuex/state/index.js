import meta_state from "./meta_state";
import user_state from "./user_state";
import videos_state from "./videos_state";

export default{
    ...meta_state,
    ...user_state,
    ...videos_state
}
