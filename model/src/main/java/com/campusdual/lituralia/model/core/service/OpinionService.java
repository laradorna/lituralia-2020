package com.campusdual.lituralia.model.core.service;


import com.campusdual.lituralia.api.core.service.IOpinionService;
import com.campusdual.lituralia.model.core.dao.OpinionDao;
import com.ontimize.db.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

@Service("OpinionService")
@Lazy
public class OpinionService implements IOpinionService {

    @Autowired
    private OpinionDao opinionDao;

    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;

    @Override
    public EntityResult opinionQuery(Map<?, ?> keyMap, List<?> attrList) {
        return this.daoHelper.query(opinionDao, keyMap, attrList);
    }

    @Override
    public EntityResult opinionInsert(Map<?, ?> attrMap) {
        return this.daoHelper.insert(opinionDao, attrMap);
    }

    @Override
    public EntityResult opinionUpdate(Map<?, ?> attrMap, Map<?, ?> keyMap) {
        return this.daoHelper.update(opinionDao, attrMap, keyMap);
    }

    @Override
    public EntityResult opinionDelete(Map<?, ?> keyMap) {
        return this.daoHelper.delete(opinionDao, keyMap);
    }

    // ---- AUTHOR OPINIONS VIEW ----

    @Override
    public EntityResult vAuthorOpinionsQuery(Map<String, Object> keysValues, List<String> attributes) throws OntimizeJEERuntimeException {
        return this.daoHelper.query(this.opinionDao, keysValues, attributes, OpinionDao.QUERY_V_AUTHOR_OPINIONS);
    }

    // ---- PUBLISHER OPINIONS VIEW ----

    @Override
    public EntityResult vPublisherOpinionsQuery(Map<String, Object> keysValues, List<String> attributes) throws OntimizeJEERuntimeException {
        return this.daoHelper.query(this.opinionDao, keysValues, attributes, OpinionDao.QUERY_V_PUBLISHER_OPINIONS);
    }

    // ---- BOOK OPINIONS VIEW ----

    @Override
    public EntityResult vBookOpinionsQuery(Map<String, Object> keysValues, List<String> attributes) throws OntimizeJEERuntimeException {
        return this.daoHelper.query(this.opinionDao, keysValues, attributes, OpinionDao.QUERY_V_BOOK_OPINIONS);
    }

}
