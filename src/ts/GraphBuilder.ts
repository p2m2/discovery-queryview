import {AskOmicsViewNode, AskOmicsViewLink, ObjectState, DatatypeLiteral } from '@/ts/types'
import RequestManager from './RequestManager';

interface GraphBuilderExpr {
    nodes:Array<AskOmicsViewNode>;
    links:Array<AskOmicsViewLink>;
}


export class GraphBuilder {
    constructor() {}

    static defaultGraph() : any {
        return {
            nodes : [ AskOmicsViewNode.something(ObjectState.CONCRETE) ],
            links : []
        }
    }

    
    /**
     * build graph from Request Manager (discovery)
     */
    static build3DJSGraph(rm : RequestManager) : GraphBuilderExpr {
        
        const graph : GraphBuilderExpr = {
            nodes : [],
            links : []
        }

        rm.getDiscovery().browse(
            (node : any, deep : Number) => {
                console.log("-- browse -- ")
                console.log(node)
                switch(node.$type) {
                    case "inrae.semantic_web.node.Root" : {
                        console.log("Root -> nothing to do")
                        graph.nodes.push(AskOmicsViewNode.something(ObjectState.CONCRETE))
                        break
                    }
                    case "inrae.semantic_web.node.Something" : {
                        
                        break
                    }
                    default : {
                        console.error(" devel erro => todo - manage "+node.$type)
                    }
                }
            }
        )
        console.log("----------------------------------------------")
        console.log(graph)

        return graph
    }

     /**
     * build graph from Request Manager (discovery)
     */
      static buildAttributesBox(rm : RequestManager, focus : string) : Promise< Object[]> {
        const lAttributeBox :  Object[] = [] ;
        console.log("focus:",focus)
        return new Promise((successCallback, failureCallback) => {
            rm.getDiscovery().browse(
                (node : any, deep : Number) => {
                    console.log("idRef:",node.idRef)
                    if ( node.idRef == focus) {
                        console.log("GO")
                        rm.attributeList(focus).then(
                            response => {
                                successCallback(response.map( (obj : DatatypeLiteral)  => obj.getObject()))
                            }
                        ).catch(e => {failureCallback(e)})
                    }
                }
            )})
    }
}