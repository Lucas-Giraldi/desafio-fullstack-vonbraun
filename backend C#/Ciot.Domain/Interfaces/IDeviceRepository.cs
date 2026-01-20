using Ciot.Domain.Entities;

namespace Ciot.Domain.Interfaces;

public interface IDeviceRepository
{
    IEnumerable<Device> GetAll();
    Device? GetById(string id);
    void Add(Device device);
}