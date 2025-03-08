import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as changeCase from "change-case";
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import resourceEndpoints from '@/States/Api/resourcesApi';
import { setResource, toggleRefresh } from '@/States/Slice/resourcesSlice';

const TABLE_STATES = ['index', 'archived'];

export default function useResource(resourceName, isPublic = false) {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const resources = useSelector((state) => state?.resources || {});
    const refresh = resources?.refresh;

    // Name formats
    const camelCaseName = changeCase.camelCase(resourceName);
    const kebabCaseName = changeCase.kebabCase(resourceName);
    const pascalCaseName = changeCase.pascalCase(resourceName);
    const capitalizeName = changeCase.capitalCase(resourceName);

    // API endpoints
    const resource = resourceEndpoints;
    const [index] = resource[`use${pascalCaseName}IndexMutation`]();
    const [archived] = resource[`use${pascalCaseName}ArchivedMutation`]();
    const [all] = resource[`use${pascalCaseName}AllMutation`]();
    const [show] = resource[`use${pascalCaseName}ShowMutation`]();
    const [store] = resource[`use${pascalCaseName}StoreMutation`]();
    const [update] = resource[`use${pascalCaseName}UpdateMutation`]();
    const [destroy] = resource[`use${pascalCaseName}DestroyMutation`]();
    const [restore] = resource[`use${pascalCaseName}RestoreMutation`]();

    // States
    const [data, setData] = useState([]);
    const [meta, setMeta] = useState({});
    const [tableState, setTableState] = useState(TABLE_STATES[0]);
    const [nextTableState, setNextTableState] = useState(TABLE_STATES[1]);
    const [current, setCurrent] = useState(null);
    const [selected, setSelected] = useState([]);
    const [loading, setLoading] = useState(false);
    const [archivedData, setArchivedData] = useState([]);

    // Fetch functions
    const fetchDatas = useCallback(async ({
        qStr = '',
        doRefresh = false
    } = {}) => {
        if (resources?.list[resourceName]) {
            setData(resources?.list[resourceName]);
        }
        setLoading(true);
        return await index(qStr)
            .unwrap()
            .then((response) => {
                setData(response.results);
                setMeta(response.meta || {});
                dispatch(setResource({
                    resource: resourceName,
                    data: response.results,
                    type: 'list'
                }));
                setLoading(false);
                doRefresh && dispatch(toggleRefresh(false));
                return response;
            })
            .catch((error) => {
                setLoading(false);
                Alert.alert('Error', error?.data?.message || 'A server error occurred');
                return error;
            });
    }, [index, resourceName, dispatch]);

    const fetchArchived = useCallback(async (qStr = '') => {
        if (resources?.archived[resourceName]) {
            setArchivedData(resources?.archived[resourceName]);
        }
        setLoading(true);
        return await archived(qStr)
            .unwrap()
            .then((response) => {
                setArchivedData(response.results);
                setMeta(response.meta || {});
                dispatch(setResource({
                    resource: resourceName,
                    data: response.results,
                    type: 'archived'
                }));
                setLoading(false);
                dispatch(toggleRefresh(false));
                return response;
            })
            .catch((error) => {
                setLoading(false);
                Alert.alert('Error', error?.data?.message || 'A server error occurred');
                return error;
            });
    }, [archived, resourceName, dispatch]);

    const fetchAll = useCallback(async (qStr = '') => {
        if (resources?.all[resourceName]) {
            setData(resources?.all[resourceName]);
        }
        setLoading(true);
        return await all(qStr)
            .unwrap()
            .then((response) => {
                setData(response.results);
                setMeta(response.meta || {});
                dispatch(setResource({
                    resource: resourceName,
                    data: response.results,
                    type: 'all'
                }));
                setLoading(false);
                dispatch(toggleRefresh(false));
                return response;
            })
            .catch((error) => {
                setLoading(false);
                Alert.alert('Error', error?.data?.message || 'A server error occurred');
                return error;
            });
    }, [all, resourceName, dispatch]);

    const fetchData = useCallback(async ({
        id,
        qStr = '',
        doRefresh = false
    } = {}) => {
        if (resources?.detail[resourceName]) {
            setCurrent(resources?.detail[resourceName]);
        }
        setLoading(true);
        return await show({ id, qStr })
            .unwrap()
            .then((response) => {
                setCurrent(response);
                dispatch(setResource({
                    resource: resourceName,
                    data: response,
                    type: 'detail'
                }));
                setLoading(false);
                doRefresh && dispatch(toggleRefresh(false));
                return response;
            })
            .catch((error) => {
                setLoading(false);
                if (error.status === 404) {
                    // Handle 404 in React Native
                    Alert.alert('Not Found', 'The requested resource was not found.');
                } else {
                    Alert.alert('Error', error?.data?.message || 'A server error occurred');
                }
                return error;
            });
    }, [show, resourceName, dispatch]);

    // CRUD operations
    const doStore = useCallback(async (data, silence = false) => {
        setLoading(true);
        return await store(data)
            .unwrap()
            .then((response) => {
                setCurrent(response);
                !silence && Alert.alert('Success', 'Record added successfully');
                setLoading(false);
                dispatch(toggleRefresh(true));
                return response;
            })
            .catch((error) => {
                setLoading(false);
                !silence && Alert.alert('Error', error?.data?.message || 'A server error occurred');
                return error;
            });
    }, [store, dispatch]);

    const doUpdate = useCallback(async (id, data) => {
        setLoading(true);
        return await update({ id, data })
            .unwrap()
            .then((response) => {
                setCurrent(response);
                Alert.alert('Success', 'Record updated successfully');
                setLoading(false);
                dispatch(toggleRefresh(true));
                return response;
            })
            .catch((error) => {
                setLoading(false);
                Alert.alert('Error', error?.data?.message || 'A server error occurred');
                return error;
            });
    }, [update, dispatch]);

    const doDestroy = useCallback(async (id) => {
        setLoading(true);
        return await destroy(id)
            .unwrap()
            .then((response) => {
                if (response?.message) {
                    Alert.alert('Info', response.message);
                } else {
                    Alert.alert('Success', 'Record deleted successfully');
                }
                setLoading(false);
                dispatch(toggleRefresh(true));
                return response;
            })
            .catch((error) => {
                setLoading(false);
                Alert.alert('Error', error?.data?.message || 'A server error occurred');
                return error;
            });
    }, [destroy, dispatch]);

    const doRestore = useCallback(async (id) => {
        setLoading(true);
        return await restore(id)
            .unwrap()
            .then((response) => {
                if (response?.message) {
                    Alert.alert('Info', response.message);
                } else {
                    Alert.alert('Success', 'Record restored successfully');
                }
                setLoading(false);
                dispatch(toggleRefresh(true));
                return response;
            })
            .catch((error) => {
                setLoading(false);
                Alert.alert('Error', error?.data?.message || 'A server error occurred');
                return error;
            });
    }, [restore, dispatch]);

    // Event handlers
    const onToggleTable = useCallback((state) => {
        if (!state) state = TABLE_STATES[0];
        const idx = TABLE_STATES.indexOf(state);
        const nextIdx = idx + 1 === TABLE_STATES.length ? 0 : idx + 1;
        const nextState = TABLE_STATES[nextIdx];
        setNextTableState(nextState);
        setTableState(state);

        if (state === 'index') {
            setData([]);
            return fetchDatas();
        } else if (state === 'archived') {
            return fetchArchived();
        } else if (state === 'all') {
            setData([]);
            return fetchAll();
        }
    }, [fetchDatas, fetchArchived, fetchAll]);

    const onStore = useCallback(async (data) => {
        return doStore(data).then((response) => {
            fetchDatas();
            return response;
        });
    }, [doStore, fetchDatas]);

    const onUpdate = useCallback(async (id, data) => {
        return doUpdate(id, data).then((response) => {
            fetchDatas();
            return response;
        });
    }, [doUpdate, fetchDatas]);

    const onDestroy = useCallback(async (id) => {
        return doDestroy(id).then((response) => {
            fetchDatas();
            setData(prevData => prevData.filter(d => d.id !== id));
            dispatch(setResource({
                resource: resourceName,
                data: data.filter(d => d.id !== id),
                type: 'list'
            }));
            return response;
        });
    }, [doDestroy, fetchDatas, data, dispatch, resourceName]);

    const onRestore = useCallback(async (id) => {
        return doRestore(id).then((response) => {
            fetchDatas();
            setData(prevData => prevData.filter(d => d.id !== id));
            dispatch(setResource({
                resource: resourceName,
                data: data.filter(d => d.id !== id),
                type: 'archived'
            }));
            return response;
        });
    }, [doRestore, fetchDatas, data, dispatch, resourceName]);

    // Navigation methods
    const toForm = useCallback((id = null) => {
        if (id) {
            navigation.navigate(`${kebabCaseName}Edit`, { id });
        } else {
            navigation.navigate(`${kebabCaseName}Add`);
        }
    }, [navigation, kebabCaseName]);

    const toView = useCallback((id) => {
        navigation.navigate(`${kebabCaseName}View`, { id });
    }, [navigation, kebabCaseName]);

    return {
        names: {
            camelCaseName,
            kebabCaseName,
            pascalCaseName,
            capitalizeName,
        },
        actions: {
            fetchDatas,
            fetchArchived,
            fetchAll,
            fetchData,
            doStore,
            doUpdate,
            doDestroy,
            doRestore
        },
        states: {
            data,
            resourceEndpoints,
            refresh,
            meta,
            current,
            selected,
            archivedData,
            tableState,
            nextTableState,
            loading,
            setMeta,
            setCurrent,
            setSelected,
            setTableState
        },
        events: {
            onToggleTable,
            onStore,
            onUpdate,
            onDestroy,
            onRestore
        },
        navigate: {
            toForm,
            toView
        }
    };
}