/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { Alias } from '@indices/_types/Alias'
import { Dictionary } from '@spec_utils/Dictionary'
import { UserDefinedValue } from '@spec_utils/UserDefinedValue'
import { RequestBase } from '@_types/Base'
import { IndexName, Name, VersionNumber } from '@_types/common'
import { TypeMapping } from '@_types/mapping/TypeMapping'
import { integer } from '@_types/Numeric'
import { Duration } from '@_types/Time'

/**
 * @rest_spec_name indices.put_template
 * @since 0.0.0
 * @stability stable
 */
export interface Request extends RequestBase {
  path_parts: {
    name: Name
  }
  query_parameters: {
    /**
     * If true, this request cannot replace or update existing index templates.
     * @server_default false
     */
    create?: boolean
    flat_settings?: boolean
    /**
     * Period to wait for a connection to the master node. If no response is
     * received before the timeout expires, the request fails and returns an error.
     * @server_default 30s
     */
    master_timeout?: Duration
    timeout?: Duration
    /**
     * Order in which Elasticsearch applies this template if index
     * matches multiple templates.
     *
     * Templates with lower 'order' values are merged first. Templates with higher
     * 'order' values are merged later, overriding templates with lower values.
     */
    order?: integer
  }
  body: {
    /**
     * Aliases for the index.
     */
    aliases?: Dictionary<IndexName, Alias>
    /**
     * Array of wildcard expressions used to match the names
     * of indices during creation.
     */
    index_patterns?: string | string[]
    /**
     * Mapping for fields in the index.
     */
    mappings?: TypeMapping
    /**
     * Order in which Elasticsearch applies this template if index
     * matches multiple templates.
     *
     * Templates with lower 'order' values are merged first. Templates with higher
     * 'order' values are merged later, overriding templates with lower values.
     */
    order?: integer
    /**
     * Configuration options for the index.
     */
    settings?: Dictionary<string, UserDefinedValue>
    /**
     * Version number used to manage index templates externally. This number
     * is not automatically generated by Elasticsearch.
     */
    version?: VersionNumber
  }
}
