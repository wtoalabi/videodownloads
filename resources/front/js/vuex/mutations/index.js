import loading_mutators from "./meta/loading_mutators";
import query_mutators from "./meta/query_mutators";
import meta_mutators from "./meta_mutators";
import video_mutators from "./video_mutators";

export default {
    ...loading_mutators,
    ...query_mutators,
    ...video_mutators,
    ...meta_mutators,
}
