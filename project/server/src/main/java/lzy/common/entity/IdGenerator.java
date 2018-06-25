package lzy.common.entity;

import lzy.utils.IdUtils;
import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SessionImplementor;
import org.hibernate.id.IdentifierGenerator;

import java.io.Serializable;

/**
 *
 * Created by bukeyan on 2017/5/13.
 */
public class IdGenerator implements IdentifierGenerator {
    @Override
    public Serializable generate(SessionImplementor sessionImplementor, Object o) throws HibernateException {
        return IdUtils.getId();
    }
}
