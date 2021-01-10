import meta_state from "./meta_state";
import user_state from "./user_state";
import videos_state from "./videos_state";
import default_state from "./meta/default_state";

export default{
    ...meta_state,
    ...user_state,
    ...default_state,
    ...videos_state
}
