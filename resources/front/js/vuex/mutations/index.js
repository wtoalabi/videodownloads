import loading_mutators from "./meta/loading_mutators";
import query_mutators from "./meta/query_mutators";
import meta_mutators from "./meta_mutators";

export default {
    ...loading_mutators,
    ...query_mutators,
    ...meta_mutators,
}
